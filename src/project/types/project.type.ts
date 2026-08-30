import { Field, ObjectType } from '@nestjs/graphql';
import { TechStackType } from '../../tech-stack/types/tech-stack.type.js';

@ObjectType()
export class ProjectType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  github?: string;

  @Field({ nullable: true, defaultValue: false })
  isFeatured?: boolean;

  @Field(() => [TechStackType])
  techStacks: TechStackType[];
}
