import { Test, TestingModule } from '@nestjs/testing';
import { AchievementService } from './achievement.service.js';
import { prisma } from '../lib/prisma.js';
import { Achievement } from '../generated/prisma/browser.js';

vi.mock('../lib/prisma.js', () => ({
  prisma: {
    achievement: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('AchievementService', () => {
  let service: AchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchievementService],
    }).compile();

    service = module.get<AchievementService>(AchievementService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all achievements', async () => {
    const achievements = [
      {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
        description: 'Working with modern frontend and backend technologies.',
        number: '8+',
        title: 'Technologies',
        icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
      },
    ] as Achievement[];

    vi.mocked(prisma.achievement.findMany).mockResolvedValue(achievements);

    const result = await service.getAll();

    expect(result).toEqual(achievements);
    expect(prisma.achievement.findMany).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when getting non-existent achievement', async () => {
    vi.mocked(prisma.achievement.findUnique).mockResolvedValue(null);

    await expect(
      service.get('2f87b181-9bee-4b3e-b075-17f605fe3cd7'),
    ).rejects.toThrow('Achievement not found');
  });

  it('should return achievement by id', async () => {
    const achievement = {
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    } as Achievement;

    vi.mocked(prisma.achievement.findUnique).mockResolvedValue(achievement);

    const result = await service.get('2f87b181-9bee-4b3e-b075-17f605fe3cd7');

    expect(result).toEqual(achievement);
    expect(prisma.achievement.findUnique).toHaveBeenCalledTimes(1);

    expect(prisma.achievement.findUnique).toHaveBeenCalledWith({
      where: {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      },
    });
  });

  it('should create an achievement', async () => {
    const input = {
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    };

    const createdAchievement = {
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      ...input,
    } as Achievement;

    vi.mocked(prisma.achievement.create).mockResolvedValue(createdAchievement);

    const result = await service.create(input);

    expect(result).toEqual(createdAchievement);

    expect(prisma.achievement.create).toHaveBeenCalledWith({
      data: input,
    });

    expect(prisma.achievement.create).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when updating non-existent achievement', async () => {
    vi.mocked(prisma.achievement.findUnique).mockResolvedValue(null);

    await expect(
      service.update({
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
        description: 'Working with modern frontend and backend technologies.',
        number: '8+',
        title: 'Technologies',
        icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
      }),
    ).rejects.toThrow('Achievement not found');
  });

  it('should update an achievement', async () => {
    const input = {
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    };

    const updatedAchievement = {
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      ...input,
    } as Achievement;

    vi.mocked(prisma.achievement.findUnique).mockResolvedValue(
      updatedAchievement,
    );
    vi.mocked(prisma.achievement.update).mockResolvedValue(updatedAchievement);

    const result = await service.update({
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      ...input,
    });

    expect(result).toEqual(updatedAchievement);

    expect(prisma.achievement.findUnique).toHaveBeenCalledWith({
      where: {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      },
    });

    expect(prisma.achievement.update).toHaveBeenCalledWith({
      where: {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      },
      data: input,
    });

    expect(prisma.achievement.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.achievement.update).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when removing non-existent achievement', async () => {
    vi.mocked(prisma.achievement.findUnique).mockResolvedValue(null);

    await expect(
      service.remove('2f87b181-9bee-4b3e-b075-17f605fe3cd7'),
    ).rejects.toThrow('Achievement not found');
  });

  it('should remove an achievement', async () => {
    const achievementToRemove = {
      id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      description: 'Working with modern frontend and backend technologies.',
      number: '8+',
      title: 'Technologies',
      icon: 'https://business-digital-card.fly.dev/api/files/achievement/aded23f7-d0c8-4087-bb59-2435f749e84f-achievement-3',
    } as Achievement;

    vi.mocked(prisma.achievement.findUnique).mockResolvedValue(
      achievementToRemove,
    );
    vi.mocked(prisma.achievement.delete).mockResolvedValue(achievementToRemove);

    const result = await service.remove('2f87b181-9bee-4b3e-b075-17f605fe3cd7');

    expect(result).toEqual(achievementToRemove);

    expect(prisma.achievement.findUnique).toHaveBeenCalledWith({
      where: {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      },
    });

    expect(prisma.achievement.delete).toHaveBeenCalledWith({
      where: {
        id: '2f87b181-9bee-4b3e-b075-17f605fe3cd7',
      },
    });

    expect(prisma.achievement.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.achievement.delete).toHaveBeenCalledTimes(1);
  });
});
