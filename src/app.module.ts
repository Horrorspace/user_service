import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

const mongoUri: string =
    process.env.MONGODB_URI || 'mongodb://user:BGNdWquZ@localhost:2717';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(mongoUri),
        UserModule,
        RefreshTokenModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
