import { Controller, Post, Body, UseGuards, ValidationPipe, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/interfaces/user.interface';

@Controller('api/chatapp/posts')
@UseGuards(AuthGuard('jwt'))
export class PostController {

    constructor(private postService: PostService) { }

    @Get()
    async getAllPost(@Res() res:Response):Promise<Response> { 
        const posts = await this.postService.getAllPost();
        return res.json({ok:true, posts});
    }

    @Post('/add-post')
    async addPost(
        @Body(ValidationPipe) createPostDto: CreatePostDto,
        @Res() res: Response): Promise<Response> {
        const post = await this.postService.addPost(createPostDto);
        return res.json({ ok: true, message: 'Post Successfully Created', post });
    };

    @Post('/add-like')
    async addLike(
        @GetUser() user:User, 
        @Body('postId') postId:string,
        @Res() res:Response): Promise<Response> { 
        const post = await this.postService.addLike(postId, user);
        return res.json({ok:true, post});
    };

}
