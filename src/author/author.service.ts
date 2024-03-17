import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ApiResponse } from '../utils/api-response';
import { TimeoutError } from 'rxjs';

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  /**
   * Create a new author
   * 
   * @param {createAuthorDto} createAuthorDto - The author to be created
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async create(createAuthorDto: CreateAuthorDto): Promise<ApiResponse> {
    
    try {
      const newAuthor = this.authorRepository.create(createAuthorDto);
      await this.authorRepository.save(newAuthor);

      return new ApiResponse(HttpStatus.CREATED, true, 'The author has been created', newAuthor);
      
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
   * Find all authors
   * 
   * @param {number} page - The page number
   * @param {number} size - The size of the page
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async findAll(page: number = 1, size: number = 10): Promise<ApiResponse> {
   
    const skip = size * (page - 1);
    const take = size;
    let data = null;

    try {
      data = await this.authorRepository.find({
        skip: skip,
        take: take,
      });

      if (data.length == 0) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'There are no authors', null);

      return new ApiResponse(HttpStatus.OK, true, 'Authors have been found', data);

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
   * Find all authors by researcher
   * 
   * @param {number} ref_researcher - The id of the researcher
   * @param {number} page - The page number
   * @param {number} size - The size of the page
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async findAllByRefResearcher(ref_researcher: number, page: number = 1, size: number = 10): Promise<ApiResponse> {

    const skip = size * (page - 1);
    const take = size;
    let data = null;

    try {
      data = await this.authorRepository.find({
        where: {
          ref_researcher: ref_researcher
        },
        skip: skip,
        take: take,
      });

      if (data.length == 0) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'There are no authors', null);

      return new ApiResponse(HttpStatus.OK, true, 'Authors have been found', data);

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
   * Find all authors by article
   * 
   * @param {number} ref_article - The id of the article
   * @param {number} page - The page number
   * @param {number} size - The size of the page
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async findAllByRefArticle(ref_article: number, page: number = 1, size: number = 10): Promise<ApiResponse> {

    const skip = size * (page - 1);
    const take = size;
    let data = null;

    try {
      data = await this.authorRepository.find({
        where: {
          ref_article: ref_article
        },
        skip: skip,
        take: take,
      });

      if (data.length == 0) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'There are no authors', null);

      return new ApiResponse(HttpStatus.OK, true, 'Authors have been found', data);

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
   * Find an author by id
   * 
   * @param {number} id - The id of the author
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async findOne(id: number): Promise<ApiResponse> {

    let data = null;

    try {
      data = await this.authorRepository.findOne({
        where: {
          id: id
        }
      
      });

      if (data == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'The author has not been found', null);

      return new ApiResponse(HttpStatus.OK, true, 'The author has been found', data);

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
   * Update an author
   * 
   * @param {number} id - The id of the author
   * @param {updateAuthorDto} updateAuthorDto - The author to be updated
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<ApiResponse> {

    try {
      await this.authorRepository.update(id, updateAuthorDto);

      return new ApiResponse(HttpStatus.OK, true, 'The author has been updated', null);

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
   * Remove an author
   * 
   * @param {number} id - The id of the author
   * 
   * @returns {Promise<ApiResponse>} - The response of the request
   */
  async remove(id: number): Promise<ApiResponse> {

    try {
      const data = await this.authorRepository.delete(id);

      if (data.affected == 0) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'The author has not been found', null);

      return new ApiResponse(HttpStatus.OK, true, 'The author has been removed', null);

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
