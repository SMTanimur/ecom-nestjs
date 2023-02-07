import { Test, TestingModule } from '@nestjs/testing';
import { FlashsalesService } from './flashsales.service';

describe('FlashsalesService', () => {
  let service: FlashsalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashsalesService],
    }).compile();

    service = module.get<FlashsalesService>(FlashsalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
