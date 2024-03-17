import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';
import { Conference } from './entities/conference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { ApiResponse } from 'src/utils/api-response';
import { TimeoutError } from 'rxjs';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectRepository(Conference) private conferenceRepository: Repository<Conference>
  ) {}

  /**
   * Create a new conference
   * 
   * @param {CreateConferenceDto} createConferenceDto - The conference data to be created
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async create(createConferenceDto: CreateConferenceDto): Promise<ApiResponse> {
    
    try {
      const newConference = this.conferenceRepository.create(createConferenceDto);
      await this.conferenceRepository.save(newConference);

      return new ApiResponse(HttpStatus.CREATED, true, 'Conference created successfully', newConference);
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
   * Retrieve all conferences
   * 
   * @param {number} page - The page number to retrieve
   * @param {number} size - The number of items to retrieve
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async findAll(page: number = 1, size: number = 10): Promise<ApiResponse> {

    const skip = size * (page - 1);
    const take = size;
    let data = null

    try {
      data = await this.conferenceRepository.findAndCount({
        skip: skip,
        take: take
      });

      if (data == undefined || data == null || data.length == 0) {
        return new ApiResponse(HttpStatus.NOT_FOUND, false, 'No conferences found', null);
      }

      return new ApiResponse(HttpStatus.OK, true, 'Conferences retrieved successfully', data);

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
   * Retrieve a single conference by ID
   * 
   * @param {number} id - The ID of the conference to retrieve
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async findOne(id: number): Promise<ApiResponse>{

    let data = null;

    try {
      data = await this.conferenceRepository.findOne({
        where: {
          id: id
        }
      });

      if (data == undefined || data == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Conference not found', null);

      return new ApiResponse(HttpStatus.OK, true, 'Conference retrieved successfully', data);
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
   * Retrieve a single conference by name
   * 
   * @param {string} name - The name of the conference to retrieve
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async findByName(name: string): Promise<ApiResponse> {

    try {
      const data = await this.conferenceRepository.findOne({
        where: {
          name: name
        }
      });

      if (data == undefined || data == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Conference not found', null);

      return new ApiResponse(HttpStatus.OK, true, 'Conference retrieved successfully', data);
      
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
   * Update a conference by ID
   * 
   * @param {number} id - The ID of the conference to update
   * @param {UpdateConferenceDto} updateConferenceDto - The updated conference data
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async update(id: number, updateConferenceDto: UpdateConferenceDto): Promise<ApiResponse> {

    try {
      await this.conferenceRepository.update(id, updateConferenceDto);

      return new ApiResponse(HttpStatus.OK, true, 'Conference updated successfully', null);
      
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
   * Remove a conference by ID
   * 
   * @param {number} id - The ID of the conference to remove
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async remove(id: number): Promise<ApiResponse> {

    try {
      await this.conferenceRepository.delete(id);

      return new ApiResponse(HttpStatus.OK, true, 'Conference removed successfully', null);
      
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

  async getAllEditionsOfConference(id: number): Promise<ApiResponse> {

    let data = null;

    try {
      data = await this.conferenceRepository.findOne({
        where: {
          id: id
        },
        relations: ['editions']
      });

      if (data == undefined || data == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Conference not found', null);

      return new ApiResponse(HttpStatus.OK, true, 'Conference editions retrieved successfully', data);
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
