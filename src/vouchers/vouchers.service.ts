import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Standard } from '../shared/constants';
import { CategorysService } from '../categories/categories.service';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IVoucher } from './entities/voucher.entity';
import { VouchersRepository } from './vouchers.repository';

@Injectable()
export class VouchersService {
  constructor(
    private voucherRepository: VouchersRepository,
    private categoryService: CategorysService,
  ) {}

  async create(createVoucherDto: IVoucher): Promise<IVoucher> {
    for (let i = 0; i < createVoucherDto.categories.length; i++) {
      const category = await this.categoryService.getCategory(
        createVoucherDto.categories[i],
      );

      if (!category) {
        throw new BadRequestException(
          `${createVoucherDto.categories[i]} is not exist`,
        );
      }
    }

    try {
      const voucherCreated = await this.voucherRepository.create(
        createVoucherDto,
      );
      return voucherCreated;
    } catch (error) {
      throw new ConflictException('Code voucher already exist');
    }
  }

  async getList(query) {
    const {
      page,
      perPage,
      sortBy,
      sortType,
      startTime,
      endTime,
      discount,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categories,
      nameVoucher,
      code,
    } = query;
    const options: { [k: string]: any } = {
      sort: { [sortBy]: sortType },
      limit: perPage || Standard.PER_PAGE,
      page: page || Standard.PAGE,
    };

    const andFilter: { [k: string]: any } = [];
    if (startTime) {
      andFilter.push({ startTime: { $gt: startTime } });
    }
    if (endTime) {
      andFilter.push({ endTime: { $gt: endTime } });
    }
    if (discount) {
      andFilter.push({ discount });
    }
    if (nameVoucher) {
      andFilter.push({ nameVoucher });
    }
    if (code) {
      andFilter.push({ code });
    }
    const filters = andFilter.length > 0 ? { $and: andFilter } : {};
    const data = await this.voucherRepository.paginate(filters, options);

    return data;
  }

  async findOne(id: string): Promise<IVoucher> {
    try {
      const voucher = await this.voucherRepository.findOne({ _id: id });
      if (!voucher) throw new NotFoundException('Voucher does not exist');
      return voucher;
    } catch (error) {
      if (error.kind) throw new BadRequestException('Id invalid');

      if (error.response) {
        if (error.response.statusCode == 404)
          throw new NotFoundException('Voucher does not exist');
      }
    }
  }

  // Find Voucher Now
  findVoucherNow(voucherCode): Promise<IVoucher> {
    const dateNow = new Date().toISOString();
    return this.voucherRepository.findOne({
      startTime: { $lt: dateNow },
      endTime: { $gt: dateNow },
      code: voucherCode,
    });
  }
  async update(id: string, updateVoucherDto: UpdateVoucherDto) {
    try {
      const a = await this.voucherRepository.findOneAndUpdate(
        {
          _id: id,
        },
        updateVoucherDto,
      );
    } catch (error) {
      console.log(error);
    }
    return this.voucherRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateVoucherDto,
    );
  }

  updateQuantity(id: string, quantityUpdate: number) {
    return this.voucherRepository.update(
      { _id: id },
      { $inc: { quantity: quantityUpdate } },
    );
  }

  remove(id: string): Promise<boolean> {
    return this.voucherRepository.deleteMany({ _id: id });
  }
}
