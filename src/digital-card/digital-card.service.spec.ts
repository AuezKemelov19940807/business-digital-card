import { Test, TestingModule } from '@nestjs/testing';
import { DigitalCardService } from './digital-card.service.js';

describe('DigitalCardService', () => {
  let service: DigitalCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalCardService],
    }).compile();

    service = module.get<DigitalCardService>(DigitalCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
