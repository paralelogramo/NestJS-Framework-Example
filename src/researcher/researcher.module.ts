import { Module } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { ResearcherController } from './researcher.controller';
import { Researcher } from './entities/researcher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Researcher, Author]),
  ],
  controllers: [ResearcherController],
  providers: [ResearcherService],
})
export class ResearcherModule {}
