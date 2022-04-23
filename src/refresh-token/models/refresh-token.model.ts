import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenDocument, RefreshToken, refreshTokenName } from '../schemas/refresh-token.schema';
import { userName } from '../../user/schemas/user.schema';

@Injectable()
export class RefreshTokenModel {
    constructor(
        @InjectModel(refreshTokenName) private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    ) {}

    async create(userDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(userDto);
    }

    async readAll(): Promise<RefreshToken[]> {
        return await this.refreshTokenModel.find().exec();
    }

    async readByUserId(userId: ObjectId): Promise<RefreshToken | null> {
        return await this.refreshTokenModel.findOne({ userId }).exec();
    }

    async updateByUserId(userId: ObjectId, data: UpdateUserDto): Promise<boolean> {
        const result = await this.userModel
            .updateOne({ login }, { $set: data })
            .exec();
        if (result.modifiedCount === 1) return true;
        else return false;
    }

    async deleteByUserId(userId: ObjectId): Promise<boolean> {
        const result = await this.refreshTokenModel.deleteMany({ userId }).exec();
        if (result.deletedCount > 0) return true;
        else return false;
    }
}
