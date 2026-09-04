import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service.js';
import { prisma } from '../lib/prisma.js';

vi.mock('../lib/prisma.js', () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },

    projectTechStack: {
      findMany: vi.fn(),
      deleteMany: vi.fn(),
    },

    $transaction: vi.fn(),
  },
}));

type Projects = Awaited<ReturnType<ProjectService['getAll']>>;

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all project', async () => {
    const projects: Projects = [
      {
        id: '018308b0-a255-4607-ae1e-43588405b89b',
        title: 'Kazteleport — Telecom & Cloud Platform',
        description:
          'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services.',
        github: '',
        image: 'image-url',
        isFeatured: true,
        url: 'https://kazteleport.kz/',
        createdAt: new Date(),
        updatedAt: new Date(),

        projectTechStacks: [
          {
            projectId: '018308b0-a255-4607-ae1e-43588405b89b',
            techStackId: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',

            techStack: {
              id: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',
              name: 'NestJS',
              icon: 'icon-url',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ],
      },
    ];

    vi.mocked(prisma.project.findMany).mockResolvedValue(projects);

    const result = await service.getAll();

    expect(result).toEqual(projects);

    expect(prisma.project.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.project.findMany).toHaveBeenCalledWith({
      include: {
        projectTechStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });
  });

  it('should throw NotFoundException when getting non-existent project', async () => {
    vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

    await expect(
      service.get('018308b0-a255-4607-ae1e-43588405b89b'),
    ).rejects.toThrow('Not Found Project');
  });

  it('should throw NotFoundException when updating non-existent project', async () => {
    vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

    await expect(
      service.update({
        id: '018308b0-a255-4607-ae1e-43588405b89b',
      }),
    ).rejects.toThrow('Not Found Project');
  });

  it('should throw NotFoundException when deleting non-existent project', async () => {
    vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

    await expect(
      service.remove('018308b0-a255-4607-ae1e-43588405b89b'),
    ).rejects.toThrow('Project not found');
  });

  it('should return project by id', async () => {
    const project = {
      id: '018308b0-a255-4607-ae1e-43588405b89b',
      title: 'Kazteleport — Telecom & Cloud Platform',
      description:
        'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services.',
      github: '',
      image: 'image-url',
      isFeatured: true,
      url: 'https://kazteleport.kz/',
      createdAt: new Date(),
      updatedAt: new Date(),

      projectTechStacks: [
        {
          projectId: '018308b0-a255-4607-ae1e-43588405b89b',
          techStackId: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',

          techStack: {
            id: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',
            name: 'NestJS',
            icon: 'icon-url',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
    };

    vi.mocked(prisma.project.findUnique).mockResolvedValue(project);

    const result = await service.get('018308b0-a255-4607-ae1e-43588405b89b');

    expect(result).toEqual(project);
    expect(prisma.project.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.project.findUnique).toHaveBeenCalledWith({
      where: {
        id: '018308b0-a255-4607-ae1e-43588405b89b',
      },
    });
  });

  it('should create project', async () => {
    const input = {
      title: 'Kazteleport — Telecom & Cloud Platform',
      description:
        'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services.',
      github: '',
      image: 'image-url',
      isFeatured: true,
      url: 'https://kazteleport.kz/',
      techStackIds: ['38bcfbec-d0cd-46c9-aedd-bb8abe1c9301'],
    };

    const projectCreated = {
      ...input,
      id: '018308b0-a255-4607-ae1e-43588405b89b',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.project.create).mockResolvedValue(projectCreated);

    const result = await service.create(input);

    expect(result).toEqual(projectCreated);
    expect(prisma.project.create).toHaveBeenCalledTimes(1);
    expect(prisma.project.create).toHaveBeenCalledWith({
      data: {
        title: 'Kazteleport — Telecom & Cloud Platform',
        description:
          'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services.',
        github: '',
        image: 'image-url',
        isFeatured: true,
        url: 'https://kazteleport.kz/',
        projectTechStacks: {
          create: [
            {
              techStack: {
                connect: {
                  id: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',
                },
              },
            },
          ],
        },
      },
      include: {
        projectTechStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });
  });

  it('should update project', async () => {
    const input = {
      id: '018308b0-a255-4607-ae1e-43588405b89b',
      title: 'Kazteleport — Telecom & Cloud Platform',
      description:
        'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services.',
      github: '',
      image: 'image-url',
      isFeatured: true,
      url: 'https://kazteleport.kz/',
      techStackIds: ['38bcfbec-d0cd-46c9-aedd-bb8abe1c9301'],
    };

    const projectCreated = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.project.findUnique).mockResolvedValue(projectCreated);
    vi.mocked(prisma.project.update).mockResolvedValue(projectCreated);

    const result = await service.update(input);

    expect(result).toEqual(projectCreated);
    expect(prisma.project.update).toHaveBeenCalledTimes(1);
    expect(prisma.project.update).toHaveBeenCalledWith({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        description: input.description,
        github: input.github,
        image: input.image,
        isFeatured: input.isFeatured,
        url: input.url,
        projectTechStacks: {
          deleteMany: {},
          create: input.techStackIds?.map((techStackId) => ({
            techStack: {
              connect: {
                id: techStackId,
              },
            },
          })),
        },
      },
      include: {
        projectTechStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });
  });

  it('should remove project', async () => {
    const project = {
      id: '018308b0-a255-4607-ae1e-43588405b89b',
      title: 'Kazteleport — Telecom & Cloud Platform',
      description:
        'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services.',
      github: '',
      image: 'image-url',
      isFeatured: true,
      url: 'https://kazteleport.kz/',
      createdAt: new Date(),
      updatedAt: new Date(),
      projectTechStacks: [
        {
          projectId: '018308b0-a255-4607-ae1e-43588405b89b',
          techStackId: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',
          techStack: {
            id: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',
            name: 'NestJS',
            icon: 'icon-url',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
    };

    const tx = {
      projectTechStack: {
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      project: {
        delete: vi.fn().mockResolvedValue(project),
      },
    };

    vi.mocked(prisma.project.findUnique).mockResolvedValue(project);

    vi.mocked(prisma.$transaction).mockImplementation(async (callback) => {
      return callback(tx as any);
    });

    const result = await service.remove(project.id);

    expect(result).toEqual(project);

    expect(prisma.project.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.project.findUnique).toHaveBeenCalledWith({
      where: {
        id: project.id,
      },
    });

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    expect(tx.projectTechStack.deleteMany).toHaveBeenCalledWith({
      where: {
        projectId: project.id,
      },
    });

    expect(tx.project.delete).toHaveBeenCalledWith({
      where: {
        id: project.id,
      },
    });
  });
});
