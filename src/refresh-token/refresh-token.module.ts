import { Module } from '@nestjs/common';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import {
    RefreshTokenSchema,
    refreshTokenName,
} from './schemas/refresh-token.schema';

const mongoOptions: ModelDefinition[] = [
    {
        name: refreshTokenName,
        schema: RefreshTokenSchema,
    },
];

@Module({
    imports: [MongooseModule.forFeature(mongoOptions)],
    controllers: [],
    providers: [],
})
export class RefreshTokenModule {}
