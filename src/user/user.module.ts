import { Module } from '@nestjs/common';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import { UserSchema, User, userName } from './schemas/user.schema';
import {
    SettingsSchema,
    Settings,
    settingsName,
} from './schemas/settings.schema';
import {
    RefreshTokenSchema,
    RefreshToken,
    refreshTokenName,
} from './schemas/refresh-token.schema';

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
