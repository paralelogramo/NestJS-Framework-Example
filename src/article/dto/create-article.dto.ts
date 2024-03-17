import { IsNotEmpty, IsNumber, IsPositive, IsString, Length} from "class-validator";

export class CreateArticleDto {

    @IsString({ message: 'The title must be a string' })
    @IsNotEmpty({ message: 'The title cannot be empty' })
    @Length(3, 256, { message: 'The title must be between 3 and 256 characters' })
    title: string;

    @IsNumber({}, {message: 'The ref_author must be a number'})
    @IsPositive({message: 'The ref_author must be greater than 0'})
    ref_edition: number;
}
