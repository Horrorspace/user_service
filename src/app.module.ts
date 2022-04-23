import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri: string = process.env.MONGODB_URI!;

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(mongoUri),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
