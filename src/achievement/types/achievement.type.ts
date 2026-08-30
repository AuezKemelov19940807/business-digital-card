import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AchievementType {
  @Field()
  id: string;

  @Field()
  number: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  description: string;
}
