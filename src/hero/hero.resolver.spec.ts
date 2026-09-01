import { Test, TestingModule } from '@nestjs/testing';
import { HeroResolver } from './hero.resolver.js';
import { HeroService } from './hero.service.js';
import { Hero } from './types/hero.type.js';
describe('HeroResolver', () => {
  let resolver: HeroResolver;

  const heroServiceMock = {
    get: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroResolver,

        {
          provide: HeroService,
          useValue: heroServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<HeroResolver>(HeroResolver);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
    heroServiceMock.get.mockResolvedValue(hero);

    const result = await resolver.hero();

    expect(result).toEqual(hero);
    expect(heroServiceMock.get).toHaveBeenCalledTimes(1);
  });

  it('should update hero', async () => {
    const input = {
      fullName: 'Auez Kemelov',
    };

    const updatedHero = {
      id: 'main',
      fullName: 'Auez Kemelov',
    };

    heroServiceMock.update.mockResolvedValue(updatedHero);

    const result = await resolver.updateHero(input);

    expect(result).toEqual(updatedHero);
    expect(heroServiceMock.update).toHaveBeenCalledWith(input);
  });

  it('should return image URL if hero has image', () => {
    const hero = {
      id: 'main',
      image: 'hero-image.jpg',
    } as Hero;

    const imageUrl = resolver.image(hero);

    expect(imageUrl).toBe(`${process.env.API_URL}/api/files/${hero.image}`);
  });

  it('should return null if hero has no image', () => {
    const hero = {
      image: '',
    } as Hero;

    const imageUrl = resolver.image(hero);
    expect(imageUrl).toBeNull();
  });
});
