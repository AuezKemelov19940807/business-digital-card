import { Test, TestingModule } from '@nestjs/testing';
import { TechStackService } from './tech-stack.service.js';
import { prisma } from '../lib/prisma.js';
import { TechStack } from '../generated/prisma/browser.js';

vi.mock('../lib/prisma.js', () => ({
  prisma: {
    techStack: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('TechStackService', () => {
  let service: TechStackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechStackService],
    }).compile();

    service = module.get<TechStackService>(TechStackService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tech stacks', async () => {
    const techStacks = [
      {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
        icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
        name: 'Claude Code',
      },
    ] as TechStack[];

    vi.mocked(prisma.techStack.findMany).mockResolvedValue(techStacks);

    const result = await service.findAll();

    expect(result).toEqual(techStacks);

    expect(prisma.techStack.findMany).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when getting non-existent tech stack', async () => {
    vi.mocked(prisma.techStack.findUnique).mockResolvedValue(null);

    await expect(
      service.get('10803621-3b04-4d55-b4a9-9a78d0276a58'),
    ).rejects.toThrow('Tech Stack not found');
  });

  it('should return tech stack by id', async () => {
    const techStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
    } as TechStack;

    vi.mocked(prisma.techStack.findUnique).mockResolvedValue(techStack);

    const result = await service.get('10803621-3b04-4d55-b4a9-9a78d0276a58');

    expect(result).toEqual(techStack);

    expect(prisma.techStack.findUnique).toHaveBeenCalledTimes(1);

    expect(prisma.techStack.findUnique).toHaveBeenCalledWith({
      where: {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      },
    });
  });

  it('should create tech stack', async () => {
    const input = {
      icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
      name: 'Claude Code',
    };

    const createdTechStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      ...input,
    } as TechStack;

    vi.mocked(prisma.techStack.create).mockResolvedValue(createdTechStack);

    const result = await service.create(input);

    expect(result).toEqual(createdTechStack);

    expect(prisma.techStack.create).toHaveBeenCalledTimes(1);
    expect(prisma.techStack.create).toHaveBeenCalledWith({
      data: input,
    });
  });

  it('should throw NotFoundException when updating non-existent tech stack', async () => {
    vi.mocked(prisma.techStack.findUnique).mockResolvedValue(null);

    await expect(
      service.update({
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
        icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
        name: 'Claude Code',
      }),
    ).rejects.toThrow('Tech Stack not found');
  });

  it('should update tech stack', async () => {
    const input = {
      icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
      name: 'Claude Code',
    };

    const updatedTechStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      ...input,
    } as TechStack;

    vi.mocked(prisma.techStack.findUnique).mockResolvedValue(updatedTechStack);

    vi.mocked(prisma.techStack.update).mockResolvedValue(updatedTechStack);

    const result = await service.update(updatedTechStack);
    expect(result).toEqual(updatedTechStack);
    expect(prisma.techStack.update).toHaveBeenCalledTimes(1);
    expect(prisma.techStack.update).toHaveBeenCalledWith({
      where: {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      },
      data: input,
    });

    expect(prisma.techStack.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.techStack.findUnique).toHaveBeenCalledWith({
      where: {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      },
    });
  });

  it('should remove an tech stack', async () => {
    const techStack = {
      id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      icon: 'https://business-digital-card.fly.dev/api/files/tech-stack/16ec8910-0021-4d0a-8cb6-2d355bf3c2bb-claudecode',
      name: 'Claude Code',
    } as TechStack;

    vi.mocked(prisma.techStack.findUnique).mockResolvedValue(techStack);
    vi.mocked(prisma.techStack.delete).mockResolvedValue(techStack);

    const result = await service.remove('10803621-3b04-4d55-b4a9-9a78d0276a58');

    expect(result).toEqual(techStack);

    expect(prisma.techStack.findUnique).toHaveBeenCalledWith({
      where: {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      },
    });

    expect(prisma.techStack.delete).toHaveBeenCalledWith({
      where: {
        id: '10803621-3b04-4d55-b4a9-9a78d0276a58',
      },
    });
    expect(prisma.techStack.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.techStack.delete).toHaveBeenCalledTimes(1);
  });
});
