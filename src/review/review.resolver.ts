import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReviewType } from './types/review.type.js';
import { ReviewService } from './review.service.js';
import { CreateReviewDto } from './dto/create-review.input.js';
import { UpdateReviewInputDto } from './dto/update-review.input.js';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [ReviewType])
  reviews() {
    return this.reviewService.getAll();
  }

  @Query(() => ReviewType)
  getReview(@Args('id') id: string) {
    return this.reviewService.get(id);
  }

  @Mutation(() => ReviewType)
  createReview(@Args('input') input: CreateReviewDto) {
    return this.reviewService.create(input);
  }

  @Mutation(() => ReviewType)
  updateReview(@Args('input') input: UpdateReviewInputDto) {
    return this.reviewService.update(input);
  }

  @Mutation(() => ReviewType)
  removeReview(@Args('id') id: string) {
    return this.reviewService.remove(id);
  }

  @ResolveField(() => String)
  avatar(@Parent() review: ReviewType) {
    return `${process.env.API_URL}/api/files/${review.avatar}`;
  }
}
