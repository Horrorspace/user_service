import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';
import { SettingsSchema, Settings } from './schemas/settings.schema';
import {
    RefreshTokenSchema,
    RefreshToken,
} from './schemas/refresh-token.schema';

const mongoUri: string = process.env.MONGODB_URI!;
const mongoOptions: ModelDefinition[] = [
    {
        name: User.name,
        schema: UserSchema,
    },
    {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
    },
    {
        name: Settings.name,
        schema: SettingsSchema,
    },
];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature(mongoOptions),
    ],
    controllers: [],
    providers: [],
})
export class UserModule {}
