import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateDigitalCardInput } from './create-digital-card.input.js';

@InputType()
export class UpdateDigitalCardInput extends PartialType(
  CreateDigitalCardInput,
) {
  @Field()
  id: string;
}
