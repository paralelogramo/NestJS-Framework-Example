import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ApiResponse } from '../utils/api-response';
import { TimeoutError } from 'rxjs';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  /**
   * Create a new article
   * 
   * @param {CreateArticleDto} createArticleDto - The data to create a new article
   * 
   * @returns {ApiResponse} - The response of the operation
   */
  async create(createArticleDto: CreateArticleDto): Promise<ApiResponse> {
    try {
      const newArticle = this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(newArticle);

      return new ApiResponse(HttpStatus.CREATED, true, 'The article has been created', newArticle);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error executing query', null);
      } else if (error instanceof TimeoutError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Timeout error', null);
      } else {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Unknown error', null);
      }
    }
  }

  /**
   * Find all articles
   * 
   * @param {number} page - The page number {default: 1}
   * @param {number} size - The size of the page {default: 10
   * 
   * @returns {ApiResponse} - The response of the operation
   */
  async findAll(page: number = 1, size: number = 10): Promise<ApiResponse> {
    const skip = (page - 1) * size;
    const take = size;
    let data = null;

    try {
      data = await this.articleRepository.find({
        skip: skip,
        take: take
      });

      if (data.length == 0) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'No articles found', null);

      return new ApiResponse(HttpStatus.OK, true, 'The articles have been found', data);

    } catch (error) {
      if (error instanceof QueryFailedError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error executing query', null);
      } else if (error instanceof TimeoutError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Timeout error', null);
      } else {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Unknown error', null);
      }
    }
  }

  /**
   * Find one article
   * 
   * @param {number} id - The id of the article {default: 1}
   * 
   * @returns {ApiResponse} - The response of the operation
   */
  async findOne(id: number): Promise<ApiResponse> {
    let data = null;

    try {
      data = await this.articleRepository.findOne({
        where: {
          id: id
        }
      });

      if (data == undefined || data == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'The article was not found', null);

      return new ApiResponse(HttpStatus.OK, true, 'The article has been found', data);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error executing query', null);
      } else if (error instanceof TimeoutError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Timeout error', null);
      } else {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Unknown error', null);
      }
    }
  }

  /**
   * Update an article
   * 
   * @param {number} id - The id of the article
   * @param {UpdateArticleDto} updateArticleDto - The data to update the article
   * 
   * @returns {ApiResponse} - The response of the operation
   */
  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<ApiResponse> {
    try {
      let article = await this.articleRepository.findOne({
        where: {
          id: id
        }
      });

      if (article == undefined || article == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'The article was not found', null);

      await this.articleRepository.update(id, updateArticleDto);

      return new ApiResponse(HttpStatus.OK, true, 'The article has been updated', null);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error executing query', null);
      } else if (error instanceof TimeoutError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Timeout error', null);
      } else {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Unknown error', null);
      }
    }
  }

  /**
   * Remove an article
   * 
   * @param {number} id - The id of the article
   * 
   * @returns {ApiResponse} - The response of the operation
   */
  async remove(id: number): Promise<ApiResponse> {
    try {
      let article = await this.articleRepository.findOne({
        where: {
          id: id
        }
      });

      if (article == undefined || article == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'The article was not found', null);
      
      await this.articleRepository.delete(id);

      return new ApiResponse(HttpStatus.OK, true, 'The article has been deleted', null);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error executing query', null);
      } else if (error instanceof TimeoutError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Timeout error', null);
      } else {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Unknown error', null);
      }
    }
  }
}
