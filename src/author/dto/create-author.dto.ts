import { IsNumber, IsPositive } from "class-validator";

export class CreateAuthorDto {

    @IsNumber({}, { message: 'The ref_article must be a number' })
    @IsPositive({ message: 'The ref_article must be a positive number' })
    ref_article: number;

    @IsNumber({}, { message: 'The ref_researcher must be a number' })
    @IsPositive({ message: 'The ref_researcher must be a positive number' })
    ref_researcher: number;
}
