import { Test, TestingModule } from '@nestjs/testing';
import { CategorysController } from './categories.controller';
import {
  mockCategory,
  mockCreateCategory,
  mockUpdateCategory,
} from './categorys.mock';
import { CategorysService } from './categories.service';

describe('CategorysController', () => {
  let categoryController: CategorysController;

  const MockCategoryService = {
    create: jest.fn(),
    delete: jest.fn(),
    getCategories: jest.fn(),
    getCategoriesActive: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorysController],
      providers: [CategorysService],
    })
      .overrideProvider(CategorysService)
      .useValue(MockCategoryService)
      .compile();

    categoryController = module.get<CategorysController>(CategorysController);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('create category', () => {
    it('[Expect-success] Should create a new category', async () => {
      MockCategoryService.create.mockResolvedValue(mockCategory);

      expect(await categoryController.create(mockCreateCategory)).toBe(
        mockCategory,
      );
    });
  });

  describe('delete category', () => {
    it('[Expect-success] Should delete category', async () => {
      MockCategoryService.delete.mockResolvedValue(Boolean);
      expect(await categoryController.deleteCategory('123')).toBe(Boolean);
    });
  });

  describe('get categories', () => {
    it('[Expect-success] Should get categories', async () => {
      MockCategoryService.getCategories.mockResolvedValue([mockCategory]);
      expect(await categoryController.getCategories()).toEqual([mockCategory]);
    });
  });

  describe('get categories active', () => {
    it('[Expect-success] Should get categories actived', async () => {
      MockCategoryService.getCategoriesActive.mockResolvedValue([mockCategory]);
      expect(await categoryController.getCategoriesActive()).toEqual([
        mockCategory,
      ]);
    });
  });

  describe('update', () => {
    it('[Expect-success] Should get categories', async () => {
      MockCategoryService.update.mockResolvedValue(mockCategory);
      expect(await categoryController.update('1', mockUpdateCategory)).toBe(
        mockCategory,
      );
    });
  });
});
