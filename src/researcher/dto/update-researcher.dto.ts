import { PartialType } from '@nestjs/mapped-types';
import { CreateResearcherDto } from './create-researcher.dto';

export class UpdateResearcherDto extends PartialType(CreateResearcherDto) {

    name?: string;
    surname?: string;
    secSurname?: string;
    university?: string;
}
