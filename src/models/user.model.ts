import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../schemas/user.schema';

@Injectable()
export class UserModel {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async readAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async readByLogin(login: string): Promise<User | null> {
        return await this.userModel.findOne({ login }).exec();
    }

    async readByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec();
    }
}
