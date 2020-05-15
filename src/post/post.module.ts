import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports:[AuthModule]
})
export class PostModule {}
