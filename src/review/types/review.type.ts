import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewType {
  @Field()
  id: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  fullName: string;

  @Field({ nullable: true })
  position?: string;

  @Field(() => Int)
  rating: number;
}
