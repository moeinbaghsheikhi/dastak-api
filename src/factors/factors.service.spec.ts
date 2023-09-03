import { Test, TestingModule } from '@nestjs/testing';
import { FactorsService } from './factors.service';

describe('FactorsService', () => {
  let service: FactorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactorsService],
    }).compile();

    service = module.get<FactorsService>(FactorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
