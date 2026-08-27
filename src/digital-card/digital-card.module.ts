import { Module } from '@nestjs/common';
import { DigitalCardService } from './digital-card.service.js';
import { DigitalCardResolver } from './digital-card.resolver.js';

@Module({
  providers: [DigitalCardService, DigitalCardResolver]
})
export class DigitalCardModule {}
