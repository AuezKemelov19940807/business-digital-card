import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateExperienceInputDto } from './create-experience.input.js';

@InputType()
export class UpdateExperienceInputDto extends PartialType(
  CreateExperienceInputDto,
) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
