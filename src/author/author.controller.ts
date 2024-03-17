import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, UseInterceptors, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ValidationDTOInterceptor } from 'src/interceptors/validation-dtos-interceptor';
import { ValidationPageableInterceptor } from 'src/interceptors/validation-paginables-interceptor';
import { ValidationIdentificationInterceptor } from 'src/interceptors/validation-identification-interceptor';

@Controller('api/author')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseInterceptors(ValidationDTOInterceptor)
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get('getAll')
  @UseInterceptors(ValidationPageableInterceptor)
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    return this.authorService.findAll(+page, +size);
  }

  @Get('getByResearcher/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  findAllByRefResearcher(@Param('id') id: number, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    return this.authorService.findAllByRefResearcher(+id, +page, +size);
  }

  @Get('getByArticle/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  findAllByRefArticle(@Param('id') id: number, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    return this.authorService.findAllByRefArticle(+id, +page, +size);
  }

  @Get('getByID/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(ValidationIdentificationInterceptor, ValidationDTOInterceptor)
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
