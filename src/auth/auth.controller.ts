import { Controller, Post, Body, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('api/chatapp/auth')
export class AuthController {
    constructor(private authService:AuthService) { }

    @Post('/register')
    async createUser(@Body(ValidationPipe) createUserDto:CreateUserDto, @Res() res:Response) {
        const data = await this.authService.createUser(createUserDto);
        res.status(HttpStatus.CREATED).json({ok: true, ...data});
    };

    @Post('/login')
    async login(@Body(ValidationPipe) authCredentials: AuthCredentialsDto, @Res() res: Response) { 
        const data = await this.authService.login(authCredentials);
        res.status(HttpStatus.OK).json({ok:true, ...data});
    };
}
