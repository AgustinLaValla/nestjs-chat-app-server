import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
    @IsNotEmpty()
    @IsString() 
    username:string
};