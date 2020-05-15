import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt-stategy';

config();

const SEED = process.env.SEED;

@Module({
    controllers: [AuthController],
    imports: [
        PassportModule.register({defaultStrategy:'jwt', session:false}), //Set the authorization strategy
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
        JwtModule.register({secret:SEED , signOptions: {expiresIn: 4 * 60 * 60}})
    ],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtStrategy]
})
export class AuthModule { }
