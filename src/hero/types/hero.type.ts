import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Hero {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  fullName: string;

  @Field()
  profession: string;

  @Field()
  description: string;

  @Field()
  email: string;

  @Field()
  location: string;

  @Field()
  isOpenToWork: boolean;

  @Field({ nullable: true })
  github?: string;

  @Field({ nullable: true })
  linkedin?: string;

  @Field({ nullable: true })
  telegram?: string;

  @Field({ nullable: true })
  image?: string;
}
