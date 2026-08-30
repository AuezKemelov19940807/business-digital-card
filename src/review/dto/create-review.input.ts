import { Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class CreateReviewDto {
  @Field()
  @MaxLength(200)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  fullName: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  @IsString()
  position?: string;

  @Field()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
