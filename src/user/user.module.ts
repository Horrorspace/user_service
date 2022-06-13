import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import { UserSchema, userName } from './schemas/user.schema';
import { SettingsSchema, settingsName } from './schemas/settings.schema';
import { UserModel } from './models/user.model';
import { QueryHandlers } from './queries/handlers/root.handler';
import { CommandHandlers } from './commands/handlers/root.handler';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const mongoOptions: ModelDefinition[] = [
    {
        name: userName,
        schema: UserSchema,
    },
    {
        name: settingsName,
        schema: SettingsSchema,
    },
];

@Module({
    imports: [MongooseModule.forFeature(mongoOptions), CqrsModule],
    controllers: [UserController],
    providers: [UserService, UserModel, ...QueryHandlers, ...CommandHandlers],
})
export class UserModule {}
