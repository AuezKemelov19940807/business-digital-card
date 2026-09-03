import { Test, TestingModule } from '@nestjs/testing';
import { ReviewResolver } from './review.resolver.js';
import { Review } from '../generated/prisma/client.js';
import { ReviewService } from './review.service.js';

describe('ReviewResolver', () => {
  let resolver: ReviewResolver;

  const serviceMockReview = {
    getAll: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewResolver,
        {
          provide: ReviewService,
          useValue: serviceMockReview,
        },
      ],
    }).compile();

    resolver = module.get<ReviewResolver>(ReviewResolver);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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

    serviceMockReview.getAll.mockResolvedValue(reviews);

    const result = await resolver.reviews();

    expect(result).toEqual(reviews);

    expect(serviceMockReview.getAll).toHaveBeenCalledTimes(1);
    expect(serviceMockReview.getAll).toHaveBeenCalledWith();
  });

  it('should return experience by id', async () => {});

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

    serviceMockReview.create.mockResolvedValue(review);

    const result = await resolver.createReview(input);

    expect(result).toEqual(review);
    expect(serviceMockReview.create).toHaveBeenCalledTimes(1);
    expect(serviceMockReview.create).toHaveBeenCalledWith(input);
  });

  it('should update review', async () => {
    const input = {
      id: '06a8e656-ef67-4f01-a247-623ae429e844',
      avatar:
        'https://business-digital-card.fly.dev/api/files/reviews/29a74c95-b3e9-4d37-a240-e82ff19348be-aizhan-mamymkhanova',
      description:
        'Auez is a professional and dependable developer. He quickly understood the project, solved complex tasks efficiently, and delivered high-quality work on time. Great to work with!',
      fullName: 'Aizhan Mamytkhanova',

      position: 'Project Manager',
      rating: 5,
    };

    const review: Review = {
      ...input,
      createdAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
    };

    serviceMockReview.update.mockResolvedValue(review);

    const result = await resolver.updateReview(input);

    expect(result).toEqual(review);
    expect(serviceMockReview.update).toHaveBeenCalledTimes(1);
    expect(serviceMockReview.update).toHaveBeenCalledWith(input);
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

    serviceMockReview.remove.mockResolvedValue(review);

    const result = await resolver.removeReview(
      '06a8e656-ef67-4f01-a247-623ae429e844',
    );

    expect(result).toEqual(review);
    expect(serviceMockReview.remove).toHaveBeenCalledTimes(1);
    expect(serviceMockReview.remove).toHaveBeenCalledWith(
      '06a8e656-ef67-4f01-a247-623ae429e844',
    );
  });

  it('should return review by id', async () => {
    const review = {
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
    };

    serviceMockReview.get.mockResolvedValue(review);

    const result = await resolver.getReview(
      '06a8e656-ef67-4f01-a247-623ae429e844',
    );

    expect(result).toEqual(review);
    expect(serviceMockReview.get).toHaveBeenCalledTimes(1);
    expect(serviceMockReview.get).toHaveBeenCalledWith(
      '06a8e656-ef67-4f01-a247-623ae429e844',
    );
  });
});
