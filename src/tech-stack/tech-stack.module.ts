import { Module } from '@nestjs/common';
import { TechStackService } from './tech-stack.service.js';
import { TechStackResolver } from './tech-stack.resolver.js';
import { S3Module } from '../s3/s3.module.js';

@Module({
  imports: [S3Module],
  providers: [TechStackService, TechStackResolver],
})
export class TechStackModule {}
