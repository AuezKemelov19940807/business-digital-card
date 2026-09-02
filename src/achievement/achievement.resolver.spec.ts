import { Test, TestingModule } from '@nestjs/testing';
import { AchievementResolver } from './achievement.resolver.js';
import { AchievementService } from './achievement.service.js';

describe('AchievementResolver', () => {
  let resolver: AchievementResolver;

  const achievementServiceMock = {
    getAll: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AchievementResolver,
        {
          provide: AchievementService,
          useValue: achievementServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<AchievementResolver>(AchievementResolver);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all achievements', async () => {
    const achievements = [
      {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
        description: 'Working with modern frontend and backend technologies.',
        number: '8+',
        title: 'Technologies',
        icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
      },
    ];

    achievementServiceMock.getAll.mockResolvedValue(achievements);

    const result = await resolver.achievements();

    expect(result).toEqual(achievements);
    expect(achievementServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(achievementServiceMock.getAll).toHaveBeenCalledWith();
  });

  it('should get an achievement by id', async () => {
    const achievement = {
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    };

    achievementServiceMock.get.mockResolvedValue(achievement);

    const result = await resolver.getAchievement(
      '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
    );

    expect(result).toEqual(achievement);
    expect(achievementServiceMock.get).toHaveBeenCalledTimes(1);
    expect(achievementServiceMock.get).toHaveBeenCalledWith(
      '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
    );
  });

  it('should create an achievement', async () => {
    const input = {
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    };
    const achievement = {
      ...input,
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
    };

    achievementServiceMock.create.mockResolvedValue(achievement);

    const result = await resolver.createAchievement(input);

    expect(result).toEqual(achievement);
    expect(achievementServiceMock.create).toHaveBeenCalledTimes(1);
    expect(achievementServiceMock.create).toHaveBeenCalledWith(input);
  });

  it('should update an achievement', async () => {
    const input = {
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    };
    const achievement = {
      ...input,
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
    };

    achievementServiceMock.update.mockResolvedValue(achievement);

    const result = await resolver.updateAchievement({
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      ...input,
    });

    expect(result).toEqual(achievement);
    expect(achievementServiceMock.update).toHaveBeenCalledTimes(1);
    expect(achievementServiceMock.update).toHaveBeenCalledWith({
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      ...input,
    });
  });

  it('should remove an achievement', async () => {
    const achievement = {
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    };

    achievementServiceMock.remove.mockResolvedValue(achievement);

    const result = await resolver.removeAchievement(
      '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
    );

    expect(result).toEqual(achievement);
    expect(achievementServiceMock.remove).toHaveBeenCalledTimes(1);
    expect(achievementServiceMock.remove).toHaveBeenCalledWith(
      '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
    );
  });
});
