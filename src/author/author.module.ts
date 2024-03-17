import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Article } from '../article/entities/article.entity';
import { Researcher } from '../researcher/entities/researcher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Article, Researcher]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
