import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User, userName } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserModel {
    constructor(
        @InjectModel(userName) private readonly userModel: Model<UserDocument>,
    ) {}

    async create(userDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(userDto);
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

    async updateByLogin(login: string, data: UpdateUserDto): Promise<boolean> {
        const result = await this.userModel
            .updateOne({ login }, { $set: data })
            .exec();
        if (result.modifiedCount === 1) return true;
        else return false;
    }

    async updateByEmail(email: string, data: UpdateUserDto): Promise<boolean> {
        const result = await this.userModel
            .updateOne({ email }, { $set: data })
            .exec();
        if (result.modifiedCount === 1) return true;
        else return false;
    }

    async deleteByLogin(login: string): Promise<boolean> {
        const result = await this.userModel.deleteOne({ login }).exec();
        if (result.deletedCount === 1) return true;
        else return false;
    }

    async deleteByEmail(email: string): Promise<boolean> {
        const result = await this.userModel.deleteOne({ email }).exec();
        if (result.deletedCount === 1) return true;
        else return false;
    }
}
