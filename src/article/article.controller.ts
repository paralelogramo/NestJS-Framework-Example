import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ValidationIdentificationInterceptor } from '../interceptors/validation-identification-interceptor';
import { ValidationPageableInterceptor } from '../interceptors/validation-paginables-interceptor';
import { ValidationDTOInterceptor } from '../interceptors/validation-dtos-interceptor';

@Controller('api/article')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class ArticleController {

  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseInterceptors(ValidationDTOInterceptor)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('getAll')
  @UseInterceptors(ValidationPageableInterceptor)
  findAll(@Query('page') page: number = 1, @Query('size') size: number=  10) {
    return this.articleService.findAll(+page, +size);
  }

  @Get('getByID/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  findOne(@Param('id') id: string){
    return this.articleService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(ValidationIdentificationInterceptor, ValidationDTOInterceptor)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}