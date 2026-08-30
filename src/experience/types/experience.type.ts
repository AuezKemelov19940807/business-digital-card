import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExperienceType {
  @Field()
  id: string;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date;

  @Field()
  isCurrent: boolean;

  @Field({ nullable: true })
  location?: string;
}
