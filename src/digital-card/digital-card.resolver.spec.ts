import { Test, TestingModule } from '@nestjs/testing';
import { DigitalCardResolver } from './digital-card.resolver.js';

describe('DigitalCardResolver', () => {
  let resolver: DigitalCardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalCardResolver],
    }).compile();

    resolver = module.get<DigitalCardResolver>(DigitalCardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
