import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceResolver } from './experience.resolver.js';
import { ExperienceService } from './experience.service.js';
import { Experience } from '../generated/prisma/browser.js';

describe('ExperienceResolver', () => {
  let resolver: ExperienceResolver;

  const experienceServiceMock = {
    getAll: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceResolver,
        {
          provide: ExperienceService,
          useValue: experienceServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<ExperienceResolver>(ExperienceResolver);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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

    experienceServiceMock.getAll.mockResolvedValue(experiences);

    const result = await resolver.experiences();

    expect(result).toEqual(experiences);
    expect(experienceServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(experienceServiceMock.getAll).toHaveBeenCalledWith();
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

    experienceServiceMock.get.mockResolvedValue(experience);

    const result = await resolver.getExperience(
      '08299514-af7c-449d-a244-7a6a2854e596',
    );

    expect(result).toEqual(experience);
    expect(experienceServiceMock.get).toHaveBeenCalledTimes(1);
    expect(experienceServiceMock.get).toHaveBeenCalledWith(
      '08299514-af7c-449d-a244-7a6a2854e596',
    );
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

    vi.mocked(experienceServiceMock.create).mockResolvedValue(experience);

    const result = await resolver.createExperience(input);

    expect(result).toEqual(experience);

    expect(experienceServiceMock.create).toHaveBeenCalledTimes(1);
    expect(experienceServiceMock.create).toHaveBeenCalledWith(input);
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

    vi.mocked(experienceServiceMock.update).mockResolvedValue(experience);

    const result = await resolver.updateExperience(input);

    expect(result).toEqual(experience);
    expect(experienceServiceMock.update).toHaveBeenCalledTimes(1);
    expect(experienceServiceMock.update).toHaveBeenCalledWith(input);
  });

  it('should remove experience', async () => {
    const experienceRemove: Experience = {
      id: '08299514-af7c-449d-a244-7a6a2854e596',
      position: 'Backend Developer',
      company: 'Freelance',
      description: '...',
      location: 'Remote',
      isCurrent: true,
      endDate: null,
      startDate: new Date('2026-08-01T00:00:00.000Z'),
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(experienceServiceMock.remove).mockResolvedValue(experienceRemove);

    const result = await resolver.removeExperience(
      '08299514-af7c-449d-a244-7a6a2854e596',
    );

    expect(result).toEqual(experienceRemove);
    expect(experienceServiceMock.remove).toHaveBeenCalledTimes(1);
    expect(experienceServiceMock.remove).toHaveBeenCalledWith(
      '08299514-af7c-449d-a244-7a6a2854e596',
    );
  });
});
