import { Model, ObjectId, ProjectionType, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    RefreshTokenDocument,
    RefreshToken,
    refreshTokenName,
} from '../schemas/refresh-token.schema';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';

@Injectable()
export class RefreshTokenModel {
    constructor(
        @InjectModel(refreshTokenName)
        private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    ) {}

    async create(
        refreshTokenDto: CreateRefreshTokenDto,
    ): Promise<RefreshToken> {
        return await this.refreshTokenModel.create(refreshTokenDto);
    }

    async readAll(): Promise<RefreshToken[]> {
        return await this.refreshTokenModel.find().exec();
    }

    async readByUserId(userId: ObjectId): Promise<RefreshToken[]> {
        return await this.refreshTokenModel.find({ userId }).exec();
    }

    async readById(_id: ObjectId): Promise<RefreshToken | null> {
        return await this.refreshTokenModel.findOne({ _id }).exec();
    }

    async deleteByUserId(userId: ObjectId): Promise<boolean> {
        const result = await this.refreshTokenModel
            .deleteMany({ userId })
            .exec();
        if (result.deletedCount > 0) return true;
        else return false;
    }

    async deleteById(_id: ObjectId): Promise<boolean> {
        const result = await this.refreshTokenModel.deleteOne({ _id }).exec();
        if (result.deletedCount === 1) return true;
        else return false;
    }

    async deleteExceptLastByUserId(userId: ObjectId): Promise<boolean> {
        const filter: FilterQuery<RefreshTokenDocument> = { userId };
        const projection: ProjectionType<RefreshTokenDocument> = {
            createdAt: 1,
        };
        const [{ createdAt: lastes }] = await this.refreshTokenModel
            .find(filter, projection)
            .sort({ createdAt: 'descending' })
            .exec();
        const lastesDate = lastes.toISOString();
        const deleteFilter: FilterQuery<RefreshTokenDocument> = {
            userId,
            createdAt: {
                $lt: lastesDate,
            },
        };
        const result = await this.refreshTokenModel
            .deleteMany(deleteFilter)
            .exec();
        if (result.deletedCount > 0) return true;
        else return false;
    }
}
