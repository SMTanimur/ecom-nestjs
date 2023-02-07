import { Test, TestingModule } from '@nestjs/testing';
import { FlashsalesController } from './flashsales.controller';
import { FlashsalesService } from './flashsales.service';

describe('FlashsalesController', () => {
  let controller: FlashsalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashsalesController],
      providers: [FlashsalesService],
    }).compile();

    controller = module.get<FlashsalesController>(FlashsalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
