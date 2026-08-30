import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateExperienceInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  company: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  position: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => GraphQLISODateTime)
  @IsDate()
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field()
  @IsBoolean()
  isCurrent: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;
}
