import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver.js';
import { ProjectService } from './project.service.js';
import { ProjectType } from './types/project.type.js';

type Projects = Awaited<ReturnType<ProjectService['getAll']>>;

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;

  const projectServiceMock = {
    getAll: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    getTechStacks: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        {
          provide: ProjectService,
          useValue: projectServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<ProjectResolver>(ProjectResolver);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
    projectServiceMock.getAll.mockResolvedValue(projects);

    const result = await resolver.projects();

    expect(result).toEqual(projects);
    expect(projectServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(projectServiceMock.getAll).toHaveBeenCalledWith();
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

    projectServiceMock.get.mockResolvedValue(project);
    const result = await resolver.getProject(
      '018308b0-a255-4607-ae1e-43588405b89',
    );

    expect(result).toEqual(project);
    expect(projectServiceMock.get).toHaveBeenCalledTimes(1);
    expect(projectServiceMock.get).toHaveBeenCalledWith(
      '018308b0-a255-4607-ae1e-43588405b89',
    );
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

    projectServiceMock.create.mockResolvedValue(projectCreated);

    const result = await resolver.createProject(input);

    expect(result).toEqual(projectCreated);
    expect(projectServiceMock.create).toHaveBeenCalledTimes(1);
    expect(projectServiceMock.create).toHaveBeenCalledWith(input);
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

    projectServiceMock.update.mockResolvedValue(projectCreated);
    const result = await resolver.updateProject(input);

    expect(result).toEqual(projectCreated);
    expect(projectServiceMock.update).toHaveBeenCalledTimes(1);
    expect(projectServiceMock.update).toHaveBeenCalledWith(input);
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

    projectServiceMock.remove.mockResolvedValue(project);
    const result = await resolver.removeProject(
      '018308b0-a255-4607-ae1e-43588405b89b',
    );

    expect(result).toEqual(project);
    expect(projectServiceMock.remove).toHaveBeenCalledTimes(1);
    expect(projectServiceMock.remove).toHaveBeenCalledWith(
      '018308b0-a255-4607-ae1e-43588405b89b',
    );
  });

  it('should return image URL', () => {
    const project: ProjectType = {
      description:
        'Corporate platform for telecom, cloud, cybersecurity, data center, and infrastructure services. Worked as Backend Developer on APIs, business logic, databases, and frontend integrations.',
      github: '',
      id: '018308b0-a255-4607-ae1e-43588405b89b',
      image:
        'https://business-digital-card.fly.dev/api/files/projects/1a9b55cd-f9d8-4e90-b8ea-1a43d49afd7b-kazteleport',
      isFeatured: true,
      techStacks: [
        {
          id: '38bcfbec-d0cd-46c9-aedd-bb8abe1c9301',
          icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/318018c0-d23c-4b33-9548-d5b04cfca91c-nestjs',
          name: 'NestJS',
        },
      ],
      title: 'Kazteleport — Telecom & Cloud Platform',
      url: 'https://kazteleport.kz/',
    };

    const imageUrl = resolver.image(project);

    expect(imageUrl).toBe(`${process.env.API_URL}/api/files/${project.image}`);
  });

  it('should return project tech stacks', async () => {
    const project = {
      id: '1',
    };

    const techStacks = [
      {
        id: 'tech-1',
        name: 'NestJS',
      },
    ];

    projectServiceMock.getTechStacks.mockResolvedValue(techStacks);

    const result = await resolver.techStacks(project as ProjectType);

    expect(result).toEqual(techStacks);

    expect(projectServiceMock.getTechStacks).toHaveBeenCalledTimes(1);
    expect(projectServiceMock.getTechStacks).toHaveBeenCalledWith('1');
  });
});
