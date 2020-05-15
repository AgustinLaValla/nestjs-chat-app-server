import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { config } from 'dotenv';

config()

const SEED = process.env.SEED;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private authService:AuthService) { 
        super({ //Refers to the superclass PassportStrategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// Set how it will be retrieve the JWT from the request
            secretOrKey: SEED, // The secret that passport is gonna use to verify the signature of the token extracted
        });
    }

    async validate(payload:JwtPayload) { 
        const { email } = payload;
        const user = await this.authService.getUserByEmail(email);

        if(!user)  throw new UnauthorizedException();

        return user;
    }
}