import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTechStackInput } from './create-tech-stack.input.js';

@InputType()
export class UpdateTechStackInput extends PartialType(CreateTechStackInput) {
  @Field()
  id: string;
}
