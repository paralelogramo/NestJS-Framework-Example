import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { ApiResponse } from '../utils/api-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Like, QueryFailedError, Repository } from 'typeorm';
import { TimeoutError } from 'rxjs';

@Injectable()
export class ResearcherService {

  constructor(
    @InjectRepository(Researcher) private researcherRepository: Repository<Researcher>
  ) {}
  
  /**
   * Creates a new researcher.
   * 
   * @param {CreateResearcherDto} createResearcherDto - The data to create a new researcher.
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async create(createResearcherDto: CreateResearcherDto): Promise<ApiResponse> {

    try {
      const newUser = this.researcherRepository.create(createResearcherDto);
      await this.researcherRepository.save(newUser);

      return new ApiResponse(HttpStatus.CREATED, true, 'Researcher created successfully', newUser); 
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
   * Retrieves all researchers with pagination.
   * 
   * @param {number} [page=1] - The page number (default: 1).
   * @param {number} [size=10] - The page size (default: 10).
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async findAll(page: number = 1, size: number = 10): Promise<ApiResponse>{

    const skip = size * (page - 1);
    const take = size;
    let data = null

    try {
      data = await this.researcherRepository.find({
        skip: skip,
        take: take
      }); 

      if (data.length == 0) return new ApiResponse(HttpStatus.OK, true, 'No researchers found', data);

      return new ApiResponse(HttpStatus.OK, true, 'Researchers retrieved successfully', data);

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
   * Retrieves a researcher by its id.
   * 
   * @param {number} id - The id of the researcher to retrieve.
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async findOne(id: number): Promise<ApiResponse>{

    let data = null;

    try {
      data = await this.researcherRepository.findOne({
        where: {
          id: id
        }
      });

      if (data == undefined || data == null) return new ApiResponse(HttpStatus.NOT_FOUND, true, 'No researcher found', data);

      return new ApiResponse(HttpStatus.OK, true, 'Researcher retrieved successfully', data);

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
   * Updates a researcher by its id.
   * 
   * @param {number} id - The id of the researcher to update.
   * @param {UpdateResearcherDto} updateResearcherDto - The data to update the researcher.
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async update(id: number, updateResearcherDto: UpdateResearcherDto): Promise<ApiResponse>{

    try {
      await this.researcherRepository.update(id, updateResearcherDto);

      return new ApiResponse(HttpStatus.OK, true, 'Researcher updated successfully', null);

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
   * Deletes a researcher by its id.
   * 
   * @param {number} id - The id of the researcher to delete.
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async remove(id: number): Promise<ApiResponse> {

    try {
      await this.researcherRepository.delete(id);

      return new ApiResponse(HttpStatus.OK, true, 'Researcher deleted successfully', null);

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
   * Retrieves all researchers with the given name.
   * 
   * @param {string} name - The name of the researchers to retrieve.
   * @param {number} [page=1] - The page number (default: 1).
   * @param {number} [pageSize=10] - The page size (default: 10).
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async findAllByName(name: string, page: number = 1, pageSize: number = 10): Promise<ApiResponse> {

    const skip = pageSize * (page - 1);
    const take = pageSize;
    let data = null;

    try {
      data = await this.researcherRepository.find({
        where: {
          name: Like(`%${name}%`)
        },
        skip: skip,
        take: take
      });

      if (data.length === 0) return new ApiResponse(HttpStatus.OK, true, 'No researchers found', data);

      return new ApiResponse(HttpStatus.OK, true, 'Researchers retrieved successfully', data);

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
   * Retrieves all researchers with the given surname.
   * 
   * @param {string} surname - The surname of the researchers to retrieve.
   * @param {number} [page=1] - The page number (default: 1).
   * @param {number} [pageSize=10] - The page size (default: 10).
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async findAllBySurname(surname: string, page: number = 1, pageSize: number = 10): Promise<ApiResponse> {

    const skip = pageSize * (page - 1);
    const take = pageSize;
    let data = null;

    try {
      data = await this.researcherRepository.find({
        where: {
          surname: Like(`%${surname}%`)
        },
        skip: skip,
        take: take
      });

      if (data.length === 0) return new ApiResponse(HttpStatus.OK, true, 'No researchers found', data);

      return new ApiResponse(HttpStatus.OK, true, 'Researchers retrieved successfully', data);

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
   * Retrieves all researchers with the given second surname.
   * 
   * @param {string} secSurname - The second surname of the researchers to retrieve.
   * @param {number} [page=1] - The page number (default: 1).
   * @param {number} [pageSize=10] - The page size (default: 10).
   * @returns 
   */
  async findAllBySecSurname(secSurname: string, page: number = 1, pageSize: number = 10): Promise<ApiResponse> {

    const skip = pageSize * (page - 1);
    const take = pageSize;
    let data = null;

    try {
      data = await this.researcherRepository.find({
        where: {
          secSurname: Like(`%${secSurname}%`)
        },
        skip: skip,
        take: take
      });

      if (data.length === 0) return new ApiResponse(HttpStatus.OK, true, 'No researchers found', data);

      return new ApiResponse(HttpStatus.OK, true, 'Researchers retrieved successfully', data);

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
   * Retrieves all researchers with the given university.
   * 
   * @param {string} university - The university of the researchers to retrieve.
   * @param {number} [page=1] - The page number (default: 1).
   * @param {number} [pageSize=10] - The page size (default: 10).
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async findAllByUniversity(university: string, page: number = 1, pageSize: number = 10): Promise<ApiResponse> {

    const skip = pageSize * (page - 1);
    const take = pageSize;
    let data = null;

    try {
      data = await this.researcherRepository.find({
        where: {
          university: Like(`%${university}%`)
        },
        skip: skip,
        take: take
      });

      if (data.length === 0) return new ApiResponse(HttpStatus.OK, true, 'No researchers found', data);

      return new ApiResponse(HttpStatus.OK, true, 'Researchers retrieved successfully', data);

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
   * Retrieves all articles of a researcher by its id.
   * 
   * @param {string} name - The name of the researcher.
   * @param {string} surname - The surname of the researcher.
   * @param {string} secSurname - The second surname of the researcher.
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation.
   */
  async getAllArticlesByResearcherCompleteName(name: string, surname: string, secSurname: string): Promise<ApiResponse> {

    try {
      const researcher = await this.researcherRepository.findOne({
        where: {
          name: name,
          surname: surname,
          secSurname: secSurname
        },
        relations: ['authors', 'authors.article', 'authors.article.edition', 'authors.article.edition.conference']
      });

      if (!researcher) {
        return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Researcher not found', null);
      }

      return new ApiResponse(HttpStatus.OK, true, 'Articles retrieved successfully', researcher);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error executing query', null);
      } else if (error instanceof TimeoutError) {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Timeout error', null);
      } else {
        console.log(error)
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Unknown error', null);
      }
    }
  }
}
