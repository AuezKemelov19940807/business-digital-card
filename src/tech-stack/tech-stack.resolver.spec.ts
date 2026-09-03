import { Test, TestingModule } from '@nestjs/testing';
import { TechStackResolver } from './tech-stack.resolver.js';
import { TechStackService } from './tech-stack.service.js';
import { TechStack } from '../generated/prisma/browser.js';

describe('TechStackResolver', () => {
  let resolver: TechStackResolver;

  const techStackMockService = {
    findAll: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechStackResolver,
        {
          provide: TechStackService,
          useValue: techStackMockService,
        },
      ],
    }).compile();

    resolver = module.get<TechStackResolver>(TechStackResolver);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all tech stack', async () => {
    const techStacks = [
      {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
        icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
        name: 'Claude Code',
      },
    ];

    techStackMockService.findAll.mockResolvedValue(techStacks);

    const result = await resolver.techStacks();

    expect(result).toEqual(techStacks);
    expect(techStackMockService.findAll).toHaveBeenCalledTimes(1);
    expect(techStackMockService.findAll).toHaveBeenCalledWith();
  });

  it('should get a tech stack by id', async () => {
    const techStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
      name: 'Claude Code',
    } as TechStack;

    techStackMockService.get.mockResolvedValue(techStack);

    const result = await resolver.techStack(
      '10803621-3b04-4d55-b4a9-9a78d0276a58',
    );

    expect(result).toEqual(techStack);

    expect(techStackMockService.get).toHaveBeenCalledTimes(1);

    expect(techStackMockService.get).toHaveBeenCalledWith(
      '10803621-3b04-4d55-b4a9-9a78d0276a58',
    );
  });

  it('should create an tech stack', async () => {
    const input = {
      icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
      name: 'Claude Code',
    };

    const techStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      ...input,
    };

    techStackMockService.create.mockResolvedValue(techStack);

    const result = await resolver.createTechStack(input);

    expect(result).toEqual(techStack);

    expect(techStackMockService.create).toHaveBeenCalledTimes(1);
    expect(techStackMockService.create).toHaveBeenCalledWith(input);
  });

  it('should update an tech stack', async () => {
    const input = {
      icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
      name: 'Claude Code',
    };

    const techStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      ...input,
    };

    techStackMockService.update.mockResolvedValue(techStack);

    const result = await resolver.updateTechStack({
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      ...input,
    });

    expect(result).toEqual(techStack);
    expect(techStackMockService.update).toHaveBeenCalledTimes(1);
    expect(techStackMockService.update).toHaveBeenCalledWith({
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      ...input,
    });
  });

  it('should remove a tech stack', async () => {
    const techStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
    };

    techStackMockService.remove.mockResolvedValue(techStack);

    const result = await resolver.removeTechStack(
      '10803621-3b04-4d55-b4a9-9a78d0276a58',
    );

    expect(result).toEqual(techStack);
    expect(techStackMockService.remove).toHaveBeenCalledTimes(1);
    expect(techStackMockService.remove).toHaveBeenCalledWith(
      '10803621-3b04-4d55-b4a9-9a78d0276a58',
    );
  });
});
