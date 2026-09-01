import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service.js';
import { vi } from 'vitest';
import { prisma } from '../lib/prisma.js';
import { NotFoundException } from '@nestjs/common';
vi.mock('../lib/prisma.js', () => ({
  prisma: {
    hero: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroService],
    }).compile();

    service = module.get<HeroService>(HeroService);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return hero', async () => {
    const hero = {
      id: 'main',
      title: 'Full Stack Developer',
      fullName: 'Auez Kemelov',
      profession: 'Software Developer',
      description: 'Experienced developer',
      email: 'test@example.com',
      location: 'Almaty',
      isOpenToWork: true,
      github: null,
      linkedin: null,
      telegram: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.hero.findUnique).mockResolvedValue(hero);

    const result = await service.get();
    expect(result).toEqual(hero);
  });

  it('should throw NotFoundException if hero not found', async () => {
    vi.mocked(prisma.hero.findUnique).mockResolvedValue(null);
    await expect(service.get()).rejects.toThrow(
      new NotFoundException('Hero not found'),
    );
  });

  it('should update hero', async () => {
    const input = {
      fullName: 'Auez Kemelov',
    };

    const updatedHero = {
      id: 'main',
      title: 'Full Stack Developer',
      fullName: 'Auez Kemelov',
      profession: 'Software Developer',
      description: 'Experienced developer',
      email: 'test@example.com',
      location: 'Almaty',
      isOpenToWork: true,
      github: null,
      linkedin: null,
      telegram: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.hero.update).mockResolvedValue(updatedHero);

    const result = await service.update(input);

    expect(result).toEqual(updatedHero);

    expect(prisma.hero.update).toHaveBeenCalledWith({
      where: {
        id: 'main',
      },
      data: input,
    });
  });
});
