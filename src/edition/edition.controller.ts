import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, UseInterceptors, Query } from '@nestjs/common';
import { EditionService } from './edition.service';
import { CreateEditionDto } from './dto/create-edition.dto';
import { UpdateEditionDto } from './dto/update-edition.dto';
import { ValidationDTOInterceptor } from 'src/interceptors/validation-dtos-interceptor';
import { ValidationPageableInterceptor } from 'src/interceptors/validation-paginables-interceptor';
import { ValidationIdentificationInterceptor } from 'src/interceptors/validation-identification-interceptor';

@Controller('api/edition')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class EditionController {
  constructor(private readonly editionService: EditionService) {}

  @Post()
  @UseInterceptors(ValidationDTOInterceptor)
  create(@Body() createEditionDto: CreateEditionDto) {
    return this.editionService.create(createEditionDto);
  }

  @Get('getAll')
  @UseInterceptors(ValidationPageableInterceptor)
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    return this.editionService.findAll();
  }

  @Get('getById/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  findOne(@Param('id') id: string) {
    return this.editionService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(ValidationIdentificationInterceptor, ValidationDTOInterceptor)
  update(@Param('id') id: string, @Body() updateEditionDto: UpdateEditionDto) {
    return this.editionService.update(+id, updateEditionDto);
  }

  @Delete(':id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  remove(@Param('id') id: string) {
    return this.editionService.remove(+id);
  }
}
