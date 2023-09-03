import { Test, TestingModule } from '@nestjs/testing';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

describe('FactorsController', () => {
  let controller: FactorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactorsController],
      providers: [FactorsService],
    }).compile();

    controller = module.get<FactorsController>(FactorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
