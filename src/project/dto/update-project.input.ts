import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProjectInputDto } from './create-project.input.js';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateProjectInputDto extends PartialType(CreateProjectInputDto) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
