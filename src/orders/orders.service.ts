import { BadRequestException, Injectable } from '@nestjs/common';
import { Standard } from '../shared/constants';
import { FlashsalesService } from '../flashsales/flashsales.service';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';
import { VouchersService } from '../vouchers/vouchers.service';
import { CreateItemOrder, IOrder, UserOrder } from './entities/order.entity';
import { OrdersRepository } from './order.repository';
import { IOrderModel } from './order.schema';
import { ORDER_STATUS_ENUM } from './orders.constain';
import { USERS_ROLE_ENUM } from 'src/users/users.constant';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepositoty: OrdersRepository,
    private readonly userService: UsersService,
    private readonly flashSaleService: FlashsalesService,
    private readonly voucherService: VouchersService,
    private readonly itemService: ItemsService,
  ) {}

  async create(userInfor, createOrderDto): Promise<IOrderModel> {
    // user Order

    const user: UserOrder = createOrderDto.user;
    user.userId = userInfor.userID;
    user.userName = userInfor.userName;

    // Check List Item Order
    const listItem = createOrderDto.items.map(async (itemOrderDto) => {
      let itemDtail = await this.itemService.findOne(
        itemOrderDto.itemId,
        // itemOrderDto.itemId.toString(),
      );

      // Check Stocks Item
      if (itemDtail.stocks < itemOrderDto.amount) {
        throw new BadRequestException(
          `${itemDtail.name} does not have enough inventory`,
        );
      }

      let createItemOrder: CreateItemOrder = { ...itemDtail };
      let flashSaleQuantityUpdate = null;

      // check flashSale quantity
      if (itemDtail.flashSaleQuantity) {
        flashSaleQuantityUpdate =
          itemDtail.flashSaleQuantity - itemOrderDto.amount;

        if (itemDtail.flashSaleQuantity < itemOrderDto.amount) {
          itemDtail = await this.itemService.findOneOrigin(
            // itemOrderDto.itemId.toString(),
            itemOrderDto.itemId,
          );
          createItemOrder = { ...itemDtail['_doc'] };
          flashSaleQuantityUpdate = null;
        }
      }

      createItemOrder.flashSaleQuantityUpdate = flashSaleQuantityUpdate;
      createItemOrder.stocksUpdate = itemDtail.stocks - itemOrderDto.amount;
      createItemOrder.amountOrder = itemOrderDto.amount;
      createItemOrder.totalPrice = itemDtail.price * itemOrderDto.amount;
      createItemOrder.originPrice = itemDtail.price * itemOrderDto.amount;

      //update createItemOrder.totalPrice if exist flashSale
      if (itemDtail.flashSalePrice) {
        createItemOrder.flashSaleId = itemDtail.flashSaleId;
        createItemOrder.totalPrice =
          itemDtail.flashSalePrice * itemOrderDto.amount;
      }

      // Check voucher
      if (createOrderDto.voucherCode) {
        const voucher = await this.voucherService.findVoucherNow(
          createOrderDto.voucherCode,
        );

        if (!voucher) {
          throw new BadRequestException('Voucher does not exist');
        }
        if (!voucher.categories.includes(itemDtail.category.name)) {
          throw new BadRequestException(
            `Voucher is not applicable for ${itemOrderDto.itemId} `,
          );
        }
        if (voucher.quantity <= 0) {
          throw new BadRequestException(
            'Voucher are no longer available. Please use another voucher',
          );
        }

        createItemOrder.voucherDiscount = voucher.discount;
        createItemOrder.codeVoucher = voucher.code;
        createItemOrder.voucherQuantity = voucher.quantity;
        createItemOrder.voucherId = voucher._id;
        createItemOrder.totalPrice =
          createItemOrder.totalPrice -
          (createItemOrder.totalPrice * voucher.discount) / 100;
      }

      return createItemOrder;
    });

    const items = await Promise.all(listItem).then((value) => value);

    //  calculate totalPrice, originPrice order
    const listUpdate = items.reduce(
      (initialValue, item) => {
        const originPrice = initialValue[0] + item.originPrice;
        const totalPrice = initialValue[1] + item.totalPrice;
        return [originPrice, totalPrice];
      },
      [0, 0],
    );
    const [originPrice, totalPrice] = listUpdate;

    const orderCreated = await this.ordersRepositoty.create({
      user,
      items,
      originPrice,
      totalPrice,
    });

    // Update stocks
    if (orderCreated) {
      let voucherId;

      items.forEach(async (item) => {
        await this.itemService.updateStocksAndSold(
          // item._id.toString(),
          item._id,
          -item.amountOrder,
          item.amountOrder,
        );

        if (item.flashSaleQuantityUpdate !== null) {
          await this.flashSaleService.updateQuantity(
            // item.flashSaleId.toString(),
            item.flashSaleId,
            // item._id.toString(),
            item._id,
            -item.amountOrder,
          );
        }

        if (item.voucherId) {
          voucherId = item.voucherId;
          await this.voucherService.updateQuantity(voucherId, -1);
        }
      });
    }
    return orderCreated;
  }

  async getList(query) {
    const {
      page,
      perPage,
      sortBy,
      sortType,
      orderID,
      userID,
      status,
      createdAt,
    } = query;

    const options: { [k: string]: any } = {
      sort: { [sortBy]: sortType },
      limit: perPage || Standard.PER_PAGE,
      page: page || Standard.PAGE,
    };

    const andFilter: { [k: string]: any } = [];
    if (orderID) {
      andFilter.push({ orderID });
    }
    if (status) {
      andFilter.push({ status });
    }

    if (createdAt) {
      andFilter.push({ createdAt: { $gt: createdAt } });
    }
    const filters = andFilter.length > 0 ? { $and: andFilter } : {};
    const data = await this.ordersRepositoty.paginate(filters, options);
    if (userID) {
      const datalistOrFindbyID: { [k: string]: any } = {};

      data.docs.forEach((order) => {
        const listOrFindbyID = [];

        if (order.user.userId.toString() === userID) {
          listOrFindbyID.push(order);
          datalistOrFindbyID.docs = listOrFindbyID;
          datalistOrFindbyID.totalDocs = data.totalDocs;
          datalistOrFindbyID.limit = data.limit;
          datalistOrFindbyID.totalPages = data.totalPages;
          datalistOrFindbyID.page = data.page;
          datalistOrFindbyID.pagingCounter = data.pagingCounter;
        }
      });
      return datalistOrFindbyID;
    }

    return data;
  }

  async findOne(userId: string, orderId: string): Promise<IOrderModel> {
    const order = await this.ordersRepositoty.findOne({ _id: orderId });
    if (!order) {
      throw new BadRequestException('order does not exist');
    }
    if (order.user.userId.toString() !== userId) {
      throw new BadRequestException('you can only view your order');
    }
    return order;
  }

  async update(id: string, request): Promise<string> {
    const orders = await this.ordersRepositoty.findOne({ _id: id });
    if (!orders) {
      throw new BadRequestException('Order does not exist');
    }
    if (
      orders.user.userId.toString() !== id &&
      request.user.userRole !== USERS_ROLE_ENUM.ADMIN
    ) {
      throw new BadRequestException('you can only view your order');
    }
    if (
      orders.status === ORDER_STATUS_ENUM.CANCEL ||
      orders.status === ORDER_STATUS_ENUM.DELIVERED
    ) {
      throw new BadRequestException('You dont cancel this orders');
    }
    const arrUpdate = [];

    const updateStatusOrder = this.ordersRepositoty.findOneAndUpdate(
      { _id: id },
      { status: ORDER_STATUS_ENUM.CANCEL },
    );
    arrUpdate.push(updateStatusOrder);
    orders.items.forEach((itemOrder: CreateItemOrder) => {
      const updateStockItem = this.itemService.updateStocks(
        itemOrder._id.toString(),
        itemOrder.amountOrder,
      );
      arrUpdate.push(updateStockItem);

      if (itemOrder.flashSaleId) {
        const updateFlashSaleQuantity = this.flashSaleService.updateQuantity(
          itemOrder.flashSaleId.toString(),
          itemOrder._id.toString(),
          itemOrder.amountOrder,
        );
        arrUpdate.push(updateFlashSaleQuantity);
      }

      if (itemOrder.voucherId) {
        const updateVoucherQuantity = this.voucherService.updateQuantity(
          itemOrder.voucherId.toString(),
          1,
        );
        arrUpdate.push(updateVoucherQuantity);
      }
    });

    Promise.all(arrUpdate).then(() => {
      console.log('Update thanh cong');
    });

    return `Order cancel`;
  }

  delete(id: string): Promise<boolean> {
    return this.ordersRepositoty.deleteMany({ _id: id });
  }
}
