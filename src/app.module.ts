import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const host =
                    process.env.MONGODB_HOST ||
                    configService.get('mongodb.host');
                const port =
                    process.env.MONGODB_PORT ||
                    configService.get('mongodb.port');
                const user =
                    process.env.MONGODB_USER ||
                    configService.get('mongodb.user');
                const password =
                    process.env.MONGODB_PASSWORD ||
                    configService.get('mongodb.password');
                const uri = `mongodb://${user}:${password}@${host}:${port}`;
                return {
                    uri,
                };
            },
        }),
        UserModule,
        RefreshTokenModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
