import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserModel {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async create(userDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(userDto);
        return await createdUser.save();
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async readByLogin(login: string): Promise<User | null> {
        return await this.userModel.findOne({ login }).exec();
    }

    async readByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async deleteByLogin(login: string): Promise<void> {
        await this.userModel.deleteOne({ login }).exec();
    }
}