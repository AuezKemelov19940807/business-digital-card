import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TechStackType {
  @Field(() => ID)
  id: string;

  @Field()
  icon: string;

  @Field()
  name: string;
}
