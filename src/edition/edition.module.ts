import { Module } from '@nestjs/common';
import { EditionService } from './edition.service';
import { EditionController } from './edition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edition } from './entities/edition.entity';
import { Article } from '../article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Edition, Article]),
  ],
  controllers: [EditionController],
  providers: [EditionService],
})
export class EditionModule {}
