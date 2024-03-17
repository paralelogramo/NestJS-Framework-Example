import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';
import { ValidationDTOInterceptor } from 'src/interceptors/validation-dtos-interceptor';
import { ValidationPageableInterceptor } from 'src/interceptors/validation-paginables-interceptor';
import { ValidationIdentificationInterceptor } from 'src/interceptors/validation-identification-interceptor';

@Controller('api/conference')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Post()
  @UseInterceptors(ValidationDTOInterceptor)
  create(@Body() createConferenceDto: CreateConferenceDto) {
    return this.conferenceService.create(createConferenceDto);
  }

  @Get('getAll')
  @UseInterceptors(ValidationPageableInterceptor)
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 10){
    return this.conferenceService.findAll(+page, +size);
  }

  @Get('getByID/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  findOne(@Param('id') id: string) {
    return this.conferenceService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(ValidationIdentificationInterceptor, ValidationDTOInterceptor)
  update(@Param('id') id: string, @Body() updateConferenceDto: UpdateConferenceDto) {
    return this.conferenceService.update(+id, updateConferenceDto);
  }

  @Delete(':id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  remove(@Param('id') id: string) {
    return this.conferenceService.remove(+id);
  }

  @Get('getAllEditionsOfConference/:id')
  @UseInterceptors(ValidationIdentificationInterceptor)
  getAllEditionsOfConference(@Param('id') id: string) {
    return this.conferenceService.getAllEditionsOfConference(+id);
  }
}
