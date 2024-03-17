import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateResearcherDto {

    @IsString({ message: 'The name must be a string' })
    @IsNotEmpty({ message: 'The name cannot be empty' })
    @Length(3, 64, { message: 'The name must be between 3 and 64 characters' })
    name: string;

    @IsString({ message: 'The surname must be a string' })
    @IsNotEmpty({ message: 'The surname cannot be empty' })
    @Length(3, 64, { message: 'The surname must be between 3 and 64 characters' })
    surname: string;

    @IsString({ message: 'The second surname must be a string' })
    @IsNotEmpty({ message: 'The second surname cannot be empty' })
    @Length(3, 64, { message: 'The second surname must be between 3 and 64 characters' })
    secSurname: string;

    @IsString({ message: 'The university must be a string' })
    @IsNotEmpty({ message: 'The university cannot be empty' })
    @Length(3, 64, { message: 'The university must be between 3 and 64 characters' })
    university: string;
}
