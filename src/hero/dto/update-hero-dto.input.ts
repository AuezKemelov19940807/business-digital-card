import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateHeroDtoInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  profession?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isOpenToWork?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  github?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  telegram?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  image?: string;
}
