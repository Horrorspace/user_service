import { Module } from '@nestjs/common';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import { UserSchema, userName } from './schemas/user.schema';
import {
    SettingsSchema,
    settingsName,
} from './schemas/settings.schema';
import {
    RefreshTokenSchema,
    refreshTokenName,
} from '../refresh-token/schemas/refresh-token.schema';

const mongoOptions: ModelDefinition[] = [
    {
        name: userName,
        schema: UserSchema,
    },
    {
        name: refreshTokenName,
        schema: RefreshTokenSchema,
    },
    {
        name: settingsName,
        schema: SettingsSchema,
    },
];

@Module({
    imports: [MongooseModule.forFeature(mongoOptions)],
    controllers: [],
    providers: [],
})
export class UserModule {}
