import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateConferenceDto {

    @IsNumber({}, { message: 'The id must be a number' })
    @Min(1, { message: 'The id must be greater than 0' })
    id: number;

    @IsString({ message: 'The name must be a string' })
    @IsNotEmpty({ message: 'The name cannot be empty' })
    @Length(3, 128, { message: 'The name must be between 3 and 128 characters' })
    name: string;
}
