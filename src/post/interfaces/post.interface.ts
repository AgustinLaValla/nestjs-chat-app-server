import { Document }  from 'mongoose';

export interface Post extends Document {
    user: string;
    username: string;
    post: string;
    comments?: Comment[];
    totalLikes?: number;
    likes?: Like[];
    createdAt?:Date;
    updatedAt?:Date;
}

interface Comment {
    userId: string
    username: string
    comment: string
    createdAt: string
};

interface Like {
    username: string
};