import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conference } from './entities/conference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conference]),
  ],
  controllers: [ConferenceController],
  providers: [ConferenceService],
})
export class ConferenceModule {}
