import { Test, TestingModule } from '@nestjs/testing';
import { S3Resolver } from './s3.resolver.js';

describe('S3Resolver', () => {
  let resolver: S3Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Resolver],
    }).compile();

    resolver = module.get<S3Resolver>(S3Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
