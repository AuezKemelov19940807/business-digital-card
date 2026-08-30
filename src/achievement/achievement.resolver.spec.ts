import { Test, TestingModule } from '@nestjs/testing';
import { AchievementResolver } from './achievement.resolver.js';

describe('AchievementResolver', () => {
  let resolver: AchievementResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchievementResolver],
    }).compile();

    resolver = module.get<AchievementResolver>(AchievementResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
