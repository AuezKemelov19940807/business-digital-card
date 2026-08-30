import { Module } from '@nestjs/common';
import { ReviewService } from './review.service.js';
import { ReviewResolver } from './review.resolver.js';

@Module({
  providers: [ReviewService, ReviewResolver]
})
export class ReviewModule {}
