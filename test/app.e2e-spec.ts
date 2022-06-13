import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { AppModule } from '../src/app.module';
import { getOptions } from '../src/main';
import { Observable } from 'rxjs';
import { IUserRes } from 'src/user/interfaces/IUserRes';

describe('AppController (e2e)', () => {
    let app: INestMicroservice;
    let client: ClientProxy;
    const userService = 'user_service';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                ClientsModule.register([
                    {
                        name: userService,
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://localhost:5672'],
                            queue: 'user',
                            queueOptions: {
                                durable: true,
                            },
                        },
                    },
                ]),
            ],
        }).compile();

        const options = await getOptions();
        app = moduleFixture.createNestMicroservice(options);
        await app.init();

        client = app.get(userService);
        await client.connect();
    });
    afterAll(async () => {
        await app.close();
        await client.close();
    });

    it('should return not found code', (done) => {
        const response: Observable<IUserRes> = client.send(
            'getUserByEmail',
            'tester@test.com',
        );
        response.subscribe((data) => {
            expect(data).toBeDefined();
            expect(data).toEqual('404');
            done();
        });
    });
});
