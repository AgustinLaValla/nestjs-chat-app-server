import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/chatapp/posts')
export class PostController {

    @Post('/add-post')
    @UseGuards(AuthGuard('jwt'))
    async addPost(@Body('post') post:string) {
        console.log(post);
    };

}
