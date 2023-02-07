import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { mockCreateItem, mockItem } from './items.mock';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;

  const MockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    })
      .overrideProvider(ItemsService)
      .useValue(MockItemsService)
      .compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('[Expect-success] Should return new user', async () => {
      MockItemsService.create.mockResolvedValue(mockCreateItem);
      expect(await controller.create(mockCreateItem)).toEqual(mockItem);
    });
  });
});
