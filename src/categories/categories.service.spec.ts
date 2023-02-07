import { Test, TestingModule } from '@nestjs/testing';
import { CategorysService } from './categories.service';

describe('CategorysService', () => {
  let service: CategorysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorysService],
    }).compile();

    service = module.get<CategorysService>(CategorysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
