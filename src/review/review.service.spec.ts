import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service.js';
import { prisma } from '../lib/prisma.js';
import { Review } from '../generated/prisma/browser.js';

vi.mock('../lib/prisma.js', () => ({
  prisma: {
    review: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all review', async () => {
    const reviews: Review[] = [
      {
        avatar:
          'https://business-digital-card.fly.dev/api/files/reviews/29a74c95-b3e9-4d37-a240-e82ff19348be-aizhan-mamymkhanova',
        description:
          'Auez is a professional and dependable developer. He quickly understood the project, solved complex tasks efficiently, and delivered high-quality work on time. Great to work with!',
        fullName: 'Aizhan Mamytkhanova',
        id: '06a8e656-ef67-4f01-a247-623ae429e844',
        position: 'Project Manager',
        rating: 5,
        createdAt: new Date('2026-08-01T00:00:00.000Z'),
        updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      },
    ];

    vi.mocked(prisma.review.findMany).mockResolvedValue(reviews);

    const res = await service.getAll();

    expect(res).toEqual(reviews);
    expect(prisma.review.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.review.findMany).toHaveBeenCalledWith();
  });

  it('should throw NotFoundException when getting non-existent review', async () => {
    vi.mocked(prisma.review.findUnique).mockResolvedValue(null);

    await expect(
      service.get('06a8e656-ef67-4f01-a247-623ae429e844'),
    ).rejects.toThrow('Not found Review');
  });

  it('should throw NotFoundException when updating non-existent review', async () => {
    vi.mocked(prisma.review.findUnique).mockResolvedValue(null);

    await expect(
      service.update({
        id: '06a8e656-ef67-4f01-a247-623ae429e844',
      }),
    ).rejects.toThrow('Not found Review');
  });

  it('should throw NotFoundException when deleting non-existent review', async () => {
    vi.mocked(prisma.review.findUnique).mockResolvedValue(null);

    await expect(
      service.remove('06a8e656-ef67-4f01-a247-623ae429e844'),
    ).rejects.toThrow('Not found Review');
  });

  it('should create review', async () => {
    const input = {
      avatar:
        'https://business-digital-card.fly.dev/api/files/reviews/29a74c95-b3e9-4d37-a240-e82ff19348be-aizhan-mamymkhanova',
      description:
        'Auez is a professional and dependable developer. He quickly understood the project, solved complex tasks efficiently, and delivered high-quality work on time. Great to work with!',
      fullName: 'Aizhan Mamytkhanova',

      position: 'Project Manager',
      rating: 5,
    };

    const review: Review = {
      id: '06a8e656-ef67-4f01-a247-623ae429e844',
      ...input,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.review.create).mockResolvedValue(review);

    const result = await service.create(input);

    expect(result).toEqual(review);

    expect(prisma.review.create).toHaveBeenCalledTimes(1);
    expect(prisma.review.create).toHaveBeenCalledWith({
      data: input,
    });
  });

  it('should update review', async () => {
    const input = {
      avatar:
        'https://business-digital-card.fly.dev/api/files/reviews/29a74c95-b3e9-4d37-a240-e82ff19348be-aizhan-mamymkhanova',
      description:
        'Auez is a professional and dependable developer. He quickly understood the project, solved complex tasks efficiently, and delivered high-quality work on time. Great to work with!',
      fullName: 'Aizhan Mamytkhanova',

      position: 'Project Manager',
      rating: 5,
    };

    const review: Review = {
      id: '06a8e656-ef67-4f01-a247-623ae429e844',
      ...input,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.review.findUnique).mockResolvedValue(review);
    vi.mocked(prisma.review.update).mockResolvedValue(review);

    const result = await service.update({
      id: '06a8e656-ef67-4f01-a247-623ae429e844',
      ...input,
    });

    expect(result).toEqual(review);
    expect(prisma.review.update).toHaveBeenCalledTimes(1);
    expect(prisma.review.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.review.update).toHaveBeenCalledWith({
      where: {
        id: '06a8e656-ef67-4f01-a247-623ae429e844',
      },
      data: input,
    });

    expect(prisma.review.findUnique).toHaveBeenCalledWith({
      where: {
        id: '06a8e656-ef67-4f01-a247-623ae429e844',
      },
    });
  });

  it('should remove review', async () => {
    const review = {
      id: '06a8e656-ef67-4f01-a247-623ae429e844',
      avatar:
        'https://business-digital-card.fly.dev/api/files/reviews/29a74c95-b3e9-4d37-a240-e82ff19348be-aizhan-mamymkhanova',
      description:
        'Auez is a professional and dependable developer. He quickly understood the project, solved complex tasks efficiently, and delivered high-quality work on time. Great to work with!',
      fullName: 'Aizhan Mamytkhanova',

      position: 'Project Manager',
      rating: 5,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    vi.mocked(prisma.review.findUnique).mockResolvedValue(review);
    vi.mocked(prisma.review.delete).mockResolvedValue(review);

    const result = await service.remove('06a8e656-ef67-4f01-a247-623ae429e844');

    expect(result).toEqual(review);
    expect(prisma.review.delete).toHaveBeenCalledTimes(1);
    expect(prisma.review.delete).toHaveBeenCalledWith({
      where: {
        id: '06a8e656-ef67-4f01-a247-623ae429e844',
      },
    });
  });
});
