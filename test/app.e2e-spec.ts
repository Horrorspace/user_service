import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { AppModule } from '../src/app.module';
import { getOptions } from '../src/main';
import { Observable } from 'rxjs';
import { IUserRes } from 'src/user/interfaces/IUserRes';
import { IRes } from 'src/user/interfaces/IRes';
import { LoggerService } from '../src/logger/logger.service';
import { UserExceptionFilter } from '../src/user/filters/user-exception.filter';
import { JsonInterceptor } from '../src/user/interceptors/json.interceptor';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
// import { Schema } from 'mongoose';
// import getCurrentDate from '../src/utils/getCurrentDate';
// import { User } from '../src/user/schemas/user.schema'

describe('AppController (e2e)', () => {
    // const { ObjectId } = Schema.Types;
    let app: INestMicroservice;
    let client: ClientProxy;
    const userService = 'user_service';

    // const registrationDate = getCurrentDate();
    const createUser: CreateUserDto = {
        login: 'tester',
        email: 'tester@test.com',
        password: '111111111',
    };
    // const mockUser: User = {
    //     _id: new ObjectId('1'),
    //     login: 'tester',
    //     email: 'tester@test.com',
    //     password: '111111111',
    //     phone: null,
    //     confirmationCode: null,
    //     confirmed: false,
    //     registrationDate,
    // };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                ClientsModule.register([
                    {
                        name: userService,
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://user:BGNdWquZ@localhost:5672'],
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
        const appLogger = app.get(LoggerService);
        app.useLogger(appLogger);
        app.useGlobalFilters(new UserExceptionFilter(appLogger));
        app.useGlobalInterceptors(new JsonInterceptor());
        await app.init();

        client = app.get(userService);
        await client.connect();
    });
    afterAll(async () => {
        await app.close();
        await client.close();
    });

    it('should return not found code on email request', (done) => {
        const response: Observable<string> = client.send(
            'getUserByEmail',
            createUser.email,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('error');
            expect(res.message).toEqual('404');
            done();
        });
    });
    it('should return not found code on login request', (done) => {
        const response: Observable<string> = client.send(
            'getUserByLogin',
            createUser.login,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('error');
            expect(res.message).toEqual('404');
            done();
        });
    });
    it('should create new user', (done) => {
        const response: Observable<string> = client.send(
            'createUserByEmail',
            JSON.stringify(createUser),
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IUserRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            const user = res.message;
            expect(res.status).toEqual('success');
            expect(user.hasOwnProperty('login')).toEqual(true);
            expect(user.hasOwnProperty('email')).toEqual(true);
            expect(user.hasOwnProperty('password')).toEqual(true);
            expect(user.login).toEqual(createUser.login);
            expect(user.email).toEqual(createUser.email);
            expect(user.password).toEqual(createUser.password);
            done();
        });
    });
    it('should return new user on email request', (done) => {
        const response: Observable<string> = client.send(
            'getUserByEmail',
            createUser.email,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IUserRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            const user = res.message;
            expect(res.status).toEqual('success');
            expect(user.hasOwnProperty('login')).toEqual(true);
            expect(user.hasOwnProperty('email')).toEqual(true);
            expect(user.hasOwnProperty('password')).toEqual(true);
            expect(user.login).toEqual(createUser.login);
            expect(user.email).toEqual(createUser.email);
            expect(user.password).toEqual(createUser.password);
            done();
        });
    });
    it('should return new user on login request', (done) => {
        const response: Observable<string> = client.send(
            'getUserByLogin',
            createUser.login,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IUserRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            const user = res.message;
            expect(res.status).toEqual('success');
            expect(user.hasOwnProperty('login')).toEqual(true);
            expect(user.hasOwnProperty('email')).toEqual(true);
            expect(user.hasOwnProperty('password')).toEqual(true);
            expect(user.login).toEqual(createUser.login);
            expect(user.email).toEqual(createUser.email);
            expect(user.password).toEqual(createUser.password);
            done();
        });
    });
    it('should delete user', (done) => {
        const response: Observable<string> = client.send(
            'deleteUserByLogin',
            createUser.login,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('success');
            expect(res.message).toEqual('');
            done();
        });
    });
    it('should return not found code on email request', (done) => {
        const response: Observable<string> = client.send(
            'getUserByEmail',
            createUser.email,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('error');
            expect(res.message).toEqual('404');
            done();
        });
    });
    it('should return not found code on login request', (done) => {
        const response: Observable<string> = client.send(
            'getUserByLogin',
            createUser.login,
        );
        response.subscribe(async (data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('error');
            expect(res.message).toEqual('404');
            done();
        });
    });
});
