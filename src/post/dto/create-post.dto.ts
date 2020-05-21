import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    user:string

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsString()
    post:string
};