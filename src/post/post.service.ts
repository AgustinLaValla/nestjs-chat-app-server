import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class PostService {

    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
        @InjectModel('User') private userModel: Model<User>) { }


    async getAllPost() {
        return await this.postModel.find().populate('user', 'name').populate('user').sort({created: 'asc'});
    };


    async addPost(createPostDto: CreatePostDto): Promise<Post> {
        const post = await this.postModel.create({ ...createPostDto });
        await this.userModel.updateOne({ _id: post.user }, {
            $push: {
                posts: {
                    postId: post._id,
                    post: post.post,
                    created: new Date()
                }
            }
        })
        return post;
    };

    async addLike(postId:string, user:User): Promise<Post> { 
        const post = await this.postModel.updateOne({_id:postId}, {
            $push:{
                likes:{
                    username: user.username
                }
            },
            $inc: { totalLikes: 1 },
        }).where('likes.username').ne(user.username);
        return post;
    };


}
