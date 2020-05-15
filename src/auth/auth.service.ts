import { Injectable, HttpException, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { firstUpper } from './helpers/capitalization.helper';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

    async createUser(createUserDto: CreateUserDto): Promise<{ user: User, token: string }> {

        const { username ,email, password } = createUserDto;

        try {
            const user = await this.userModel.create({username: firstUpper(username), email, password});

            const salt = await genSalt(10);
            user.password = await hash(user.password, salt);

            await user.save();

            user.password = null;

            const payload: JwtPayload = { email: user.email, password: user.password }

            const token = await this.jwtService.sign(payload);

            return { user, token };

        } catch (error) {

            if (error.code === 11000) {
                if (Object.keys(error.keyPattern)[0] === 'username') throw new NotAcceptableException(`User already exists`);
                if (Object.keys(error.keyPattern)[0] === 'email') throw new NotAcceptableException(`Email already exists`);
            };
        }
    };

    async login(authCredentialsDto:AuthCredentialsDto): Promise<{ user: User, token: string }>  { 
        const user = await this.getUserByEmail(authCredentialsDto.email);

        const isValid = await compare(authCredentialsDto.password ,user.password);
        if(!isValid) throw new UnprocessableEntityException(`User or password is wrong`);

        const payload: JwtPayload = { email: user.email, password: user.password }

        const token = await this.jwtService.sign(payload);

        return { user, token }; 
        
    };

    async getUserByEmail(email:string): Promise<User> { 
        const user = await this.userModel.findOne({email});
        if(!user) throw new NotFoundException(`User Not Found`);
        return user;
    };

};
