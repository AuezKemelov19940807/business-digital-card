import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAchievementInputDto } from './create-achievement.input.js';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateAchievementInputDto extends PartialType(
  CreateAchievementInputDto,
) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
