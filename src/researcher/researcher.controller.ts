import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { ResearcherService } from './researcher.service';
import { ApiResponse } from '../utils/api-response';
import { ValidationDTOInterceptor } from '../interceptors/validation-dtos-interceptor';
import { ValidationPageableInterceptor } from '../interceptors/validation-paginables-interceptor';
import { ValidationIdentificationInterceptor } from 'src/interceptors/validation-identification-interceptor';

@Controller('api/researcher')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class ResearcherController {
  constructor(private readonly researcherService: ResearcherService) { }

  @Post()
  @UseInterceptors(ValidationDTOInterceptor)
  async create(@Body() createResearcherDto: CreateResearcherDto) {
    try {
      return await this.researcherService.create(createResearcherDto);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error creating researcher', null);
    }
  }

  @Get('getAll')
  @UseInterceptors(ValidationPageableInterceptor)
  async findAll(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    try {
      return await this.researcherService.findAll(+page, +size);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving researchers', null);
    }
  }

  @Get('getByID/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  async findOne(@Param('id') id: number) {
    try {
      return await this.researcherService.findOne(+id);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving researcher', null);
    }
  }

  @Put(':id')
  @UseInterceptors(ValidationIdentificationInterceptor, ValidationDTOInterceptor)
  async update(@Param('id') id: number, @Body() updateResearcherDto: UpdateResearcherDto) {
    try {
      return await this.researcherService.update(+id, updateResearcherDto);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error updating researcher', null);
    }
  }

  @Delete(':id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  async remove(@Param('id') id: number) {
    try {
      return await this.researcherService.remove(+id);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error deleting researcher', null);
    }
  }

  @Get('getByName/:name')
  @UseInterceptors(ValidationPageableInterceptor)
  async findAllByName(@Param('name') name: string, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    try {
      return await this.researcherService.findAllByName(name, +page, +size);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving researchers by name', null);
    }
  }

  @Get('getBySurname/:surname')
  @UseInterceptors(ValidationPageableInterceptor)
  async findAllBySurname(@Param('surname') surname: string, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    try {
      return await this.researcherService.findAllBySurname(surname, +page, +size);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving researchers by surname', null);
    }
  }

  @Get('getBySecSurname/:secSurname')
  @UseInterceptors(ValidationPageableInterceptor)
  async findAllBySecSurname(@Param('secSurname') secSurname: string, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    try {
      return await this.researcherService.findAllBySecSurname(secSurname, +page, +size);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving researchers by second surname', null);
    }
  }

  @Get('getByUniversity/:university')
  @UseInterceptors(ValidationPageableInterceptor)
  async findAllByUniversity(@Param('university') university: string, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    try {
      return await this.researcherService.findAllByUniversity(university, +page, +size);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving researchers by university', null);
    }
  }

  @Get('getAllArticlesByResearcherCompleteName/:name/:surname/:secSurname')
  async getAllArticlesByResearcherCompleteName(@Param('name') name: string, @Param('surname') surname: string, @Param('secSurname') secSurname: string) {
    try {
      return await this.researcherService.getAllArticlesByResearcherCompleteName(name, surname, secSurname);
    } catch (error) {
      return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error retrieving articles by researcher complete name', null);
    }
  }
}
