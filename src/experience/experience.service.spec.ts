import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service.js';

describe('ExperienceService', () => {
  let service: ExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceService],
    }).compile();

    service = module.get<ExperienceService>(ExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
