import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import getCurrentDate from 'src/utils/getCurrentDate';

describe('UserModel', () => {
    let userRepository: UserModel;
    let userModel: Model<User>;

    const registrationDate = getCurrentDate();
    const mockUser: User = {
        login: 'tester',
        email: 'tester@test.com',
        password: '111111111',
        phone: null,
        confirmationCode: null,
        confirmed: false,
        registrationDate,
        refreshTokens: [],
        settings: null
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserModel,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockUser),
                        constructor: jest.fn().mockResolvedValue(mockUser),
                        find: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    }
                }
            ],
        }).compile();

        userRepository = module.get(UserModel);
        userModel = module.get(getModelToken(User.name));
    });
})