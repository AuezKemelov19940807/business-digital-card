import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateAchievementInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @IsString()
  icon?: string;

  @IsString()
  @Field({ nullable: true })
  @MaxLength(200)
  description?: string;
}
