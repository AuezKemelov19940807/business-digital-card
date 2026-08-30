import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateProjectInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  url?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  github?: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  techStackIds?: string[];
}
