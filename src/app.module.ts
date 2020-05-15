import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { PostModule } from './post/post.module';

config();

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}),
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
