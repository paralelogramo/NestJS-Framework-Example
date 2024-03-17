import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateEditionDto } from './dto/create-edition.dto';
import { UpdateEditionDto } from './dto/update-edition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Edition } from './entities/edition.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/utils/api-response';

@Injectable()
export class EditionService {

  constructor(
    @InjectRepository(Edition) private editionRepository: Repository<Edition>,
  ) {}

  /**
   * Create a new edition
   * 
   * @param {CreateEditionDto} createEditionDto - The edition data to be created
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async create(createEditionDto: CreateEditionDto): Promise<ApiResponse> {

    try {
      const newEdition = this.editionRepository.create(createEditionDto);
      await this.editionRepository.save(newEdition);

      return new ApiResponse(HttpStatus.CREATED, true, 'Edition created successfully', newEdition);
    } catch (error) {
      
    }
  }

  /**
   * 
   * @param {number} page - The page number to retrieve
   * @param {number} size - The number of items to retrieve
   * @returns 
   */
  async findAll(page: number = 1, size: number = 10): Promise<ApiResponse> {

    const skip = size * (page - 1);
    const take = size;
    let data = null;

    try {
      data = await this.editionRepository.findAndCount({
        skip: skip,
        take: take
      });

      if (data == undefined || data == null || data.length == 0) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'No editions found', null);

      return new ApiResponse(HttpStatus.OK, true, 'Editions retrieved successfully', data);
    } catch (error) {
      
    }
  }

  /**
   * Retrieve a single edition
   * 
   * @param {number} id - The ID of the edition to retrieve
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async findOne(id: number): Promise<ApiResponse> {

    let data = null;

    try {
      data = await this.editionRepository.findOne({
        where: {
          id: id
        }
      });

      if (data == undefined || data == null) return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Edition not found', null);

      return new ApiResponse(HttpStatus.OK, true, 'Edition retrieved successfully', data);
    } catch (error) {
      
    }
  }

  /**
   * Update an edition
   * 
   * @param {number} id - The ID of the edition to update
   * @param {UpdateEditionDto} updateEditionDto - The edition data to be updated
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async update(id: number, updateEditionDto: UpdateEditionDto): Promise<ApiResponse> {

    try {
      await this.editionRepository.update(id, updateEditionDto);

      return new ApiResponse(HttpStatus.OK, true, 'Edition updated successfully', null);
    } catch (error) {
      
    }
  }

  /**
   * Delete an edition
   * 
   * @param {number} id - The ID of the edition to delete
   * 
   * @returns {Promise<ApiResponse>} - An ApiResponse containing the result of the operation
   */
  async remove(id: number): Promise<ApiResponse> {

    try {
      await this.editionRepository.delete(id);

      return new ApiResponse(HttpStatus.OK, true, 'Edition deleted successfully', null);
      
    } catch (error) {
      
    }
  }
}
