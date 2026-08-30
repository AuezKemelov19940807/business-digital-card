import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateReviewDto } from './create-review.input.js';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateReviewInputDto extends PartialType(CreateReviewDto) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
