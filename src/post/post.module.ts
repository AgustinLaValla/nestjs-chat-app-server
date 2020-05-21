import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schemas/post.schema';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports:[
    AuthModule,
    MongooseModule.forFeature([{name:'Post', schema: postSchema}]) ,
    AuthModule
  ]
})
export class PostModule {}
