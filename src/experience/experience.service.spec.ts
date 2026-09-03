import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service.js';
import { prisma } from '../lib/prisma.js';
import { Experience } from '../generated/prisma/browser.js';

vi.mock('../lib/prisma.js', () => ({
  prisma: {
    experience: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      delete: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('ExperienceService', () => {
  let service: ExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceService],
    }).compile();

    service = module.get<ExperienceService>(ExperienceService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all experience', async () => {
    const experiences: Experience[] = [
      {
        id: '08299514-af7c-449d-a244-7a6a2854e596',
        position: 'Backend Developer',
        company: 'Freelance',
        description:
          'Developing web applications and backend services using Node.js, NestJS and TypeScript. Building REST and GraphQL APIs, integrating PostgreSQL with Prisma, implementing authentication, file storage and third-party services.',
        location: 'Remote',
        isCurrent: true,
        startDate: new Date('2026-08-01T00:00:00.000Z'),
        endDate: null,
        createdAt: new Date('2026-08-01T00:00:00.000Z'),
        updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      },
    ];

    const prismaExperienceFindMany = prisma.experience.findMany;

    vi.mocked(prismaExperienceFindMany).mockResolvedValue(experiences);

    const result = await service.getAll();

    expect(result).toEqual(experiences);

    expect(prismaExperienceFindMany).toHaveBeenCalledTimes(1);
    expect(prismaExperienceFindMany).toHaveBeenCalledWith();
  });

  it('should throw NotFoundException when getting non-existent experience', async () => {
    vi.mocked(prisma.experience.findUnique).mockResolvedValue(null);

    await expect(
      service.get('08299514-af7c-449d-a244-7a6a2854e596'),
    ).rejects.toThrow('Experience not found');
  });

  it('should return experience by id', async () => {
    const experience: Experience = {
      id: '08299514-af7c-449d-a244-7a6a2854e596',
      position: 'Backend Developer',
      company: 'Freelance',
      description:
        'Developing web applications and backend services using Node.js, NestJS and TypeScript. Building REST and GraphQL APIs, integrating PostgreSQL with Prisma, implementing authentication, file storage and third-party services.',
      location: 'Remote',
      isCurrent: true,
      startDate: new Date('2026-08-01T00:00:00.000Z'),
      endDate: null,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.experience.findUnique).mockResolvedValue(experience);

    const result = await service.get('08299514-af7c-449d-a244-7a6a2854e596');

    expect(result).toEqual(experience);
    expect(prisma.experience.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.experience.findUnique).toHaveBeenCalledWith({
      where: {
        id: '08299514-af7c-449d-a244-7a6a2854e596',
      },
    });
  });

  it('should create experience', async () => {
    const input = {
      position: 'Backend Developer',
      company: 'Freelance',
      description: '...',
      location: 'Remote',
      isCurrent: true,
      startDate: new Date('2026-08-01T00:00:00.000Z'),
    };
    const experience: Experience = {
      id: '08299514-af7c-449d-a244-7a6a2854e596',
      ...input,
      endDate: null,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.experience.create).mockResolvedValue(experience);

    const result = await service.create(input);

    expect(result).toEqual(experience);

    expect(prisma.experience.create).toHaveBeenCalledTimes(1);
    expect(prisma.experience.create).toHaveBeenCalledWith({
      data: input,
    });
  });

  it('should throw NotFoundException when updating non-existent experience', async () => {
    vi.mocked(prisma.experience.findUnique).mockResolvedValue(null);

    await expect(
      service.update({
        id: '08299514-af7c-449d-a244-7a6a2854e596',
      }),
    ).rejects.toThrow('Experience not found');
  });

  it('should update experience', async () => {
    const input = {
      id: '08299514-af7c-449d-a244-7a6a2854e596',
      position: 'Backend Developer',
      company: 'Freelance',
      description: '...',
      location: 'Remote',
      isCurrent: true,
      startDate: new Date('2026-08-01T00:00:00.000Z'),
    };

    const experience: Experience = {
      ...input,
      endDate: null,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.experience.findUnique).mockResolvedValue(experience);
    vi.mocked(prisma.experience.update).mockResolvedValue(experience);

    const result = await service.update(input);

    expect(result).toEqual(experience);

    expect(prisma.experience.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.experience.findUnique).toHaveBeenCalledWith({
      where: {
        id: input.id,
      },
    });

    expect(prisma.experience.update).toHaveBeenCalledTimes(1);
    expect(prisma.experience.update).toHaveBeenCalledWith({
      where: {
        id: input.id,
      },
      data: {
        position: input.position,
        company: input.company,
        description: input.description,
        location: input.location,
        isCurrent: input.isCurrent,
        startDate: input.startDate,
      },
    });
  });

  it('should throw NotFoundException when removing non-existent experience', async () => {
    vi.mocked(prisma.experience.findUnique).mockResolvedValue(null);

    await expect(
      service.remove('08299514-af7c-449d-a244-7a6a2854e596'),
    ).rejects.toThrow('Experience not found');

    expect(prisma.experience.delete).not.toHaveBeenCalled();
  });

  it('should remove experience', async () => {
    const experienceRemove: Experience = {
      id: '08299514-af7c-449d-a244-7a6a2854e596',
      position: 'Backend Developer',
      company: 'Freelance',
      description:
        'Developing web applications and backend services using Node.js, NestJS and TypeScript. Building REST and GraphQL APIs, integrating PostgreSQL with Prisma, implementing authentication, file storage and third-party services.',
      location: 'Remote',
      isCurrent: true,
      endDate: null,
      startDate: new Date('2026-08-01T00:00:00.000Z'),
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.experience.findUnique).mockResolvedValue(experienceRemove);
    vi.mocked(prisma.experience.delete).mockResolvedValue(experienceRemove);

    const result = await service.remove('08299514-af7c-449d-a244-7a6a2854e596');

    expect(result).toEqual(experienceRemove);

    expect(prisma.experience.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.experience.findUnique).toHaveBeenCalledWith({
      where: {
        id: '08299514-af7c-449d-a244-7a6a2854e596',
      },
    });

    expect(prisma.experience.delete).toHaveBeenCalledTimes(1);
    expect(prisma.experience.delete).toHaveBeenCalledWith({
      where: {
        id: '08299514-af7c-449d-a244-7a6a2854e596',
      },
    });
  });
});
