import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class AuthCredentialsDto {

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password should have at least one Uppercase vowel, one lowercase vowel, one number, and one special character' })
    password:string;
};