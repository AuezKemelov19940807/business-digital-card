import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service.js';
import { AchievementResolver } from './achievement.resolver.js';
import { S3Module } from '../s3/s3.module.js';

@Module({
  imports: [S3Module],
  providers: [AchievementService, AchievementResolver],
})
export class AchievementModule {}
