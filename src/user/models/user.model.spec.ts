import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from './user.model';
import { Model, FilterQuery, UpdateQuery, Schema } from 'mongoose';
import { DeleteResult, UpdateResult } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { UserDocument, User, userName } from '../schemas/user.schema';
import { settingsName } from '../schemas/settings.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import getCurrentDate from '../../utils/getCurrentDate';
import { UpdateUserDto } from '../dto/update-user.dto';

const { ObjectId } = Schema.Types;

describe('UserModel', () => {
    let userRepository: UserModel;
    let userModel: Model<User>;

    const registrationDate = getCurrentDate();
    const mockUser: User = {
        _id: new ObjectId('1'),
        login: 'tester',
        email: 'tester@test.com',
        password: '111111111',
        phone: null,
        confirmationCode: null,
        confirmed: false,
        registrationDate,
        // refreshTokens: [],
        // settings: null,
    };
    const mockUser_1: User = {
        _id: new ObjectId('2'),
        login: 'tester1',
        email: 'tester1@test.com',
        password: '111111111',
        phone: '+79999999999',
        confirmationCode: '948219',
        confirmed: false,
        registrationDate,
        // refreshTokens: [],
        // settings: null,
    };
    const createUser: CreateUserDto = {
        login: 'tester',
        email: 'tester@test.com',
        password: '111111111',
    };
    const updateUser_1: UpdateUserDto = {
        email: 'tester2@test.com',
        phone: '+79999999999',
        confirmationCode: '948219',
    };
    const updatedUser_1: User = {
        ...mockUser,
        ...updateUser_1,
    };
    const userArr = [mockUser, mockUser_1];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserModel,
                {
                    provide: getModelToken(userName),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockUser),
                        constructor: jest.fn().mockResolvedValue(mockUser),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        updateOne: jest.fn(),
                        deleteOne: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
                {
                    provide: getModelToken(settingsName),
                    useValue: {
                        new: jest.fn().mockResolvedValue(null),
                        constructor: jest.fn().mockResolvedValue(null),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        updateOne: jest.fn(),
                        deleteOne: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        userRepository = module.get(UserModel);
        userModel = module.get(getModelToken(userName));
    });

    it('should be defined', () => {
        expect(userRepository).toBeDefined();
    });

    it('should create new user', async () => {
        jest.spyOn(userModel, 'create').mockImplementation((doc: unknown) => {
            const userDto = doc as CreateUserDto;
            const result: User = {
                ...userDto,
                _id: new ObjectId('1'),
                phone: null,
                registrationDate,
                confirmationCode: null,
                confirmed: false,
                // settings: null,
            };
            return result as any;
        });
        const createdUser = await userRepository.create(createUser);
        expect(createdUser).toEqual(mockUser);
    });

    it('should return all users', async () => {
        jest.spyOn(userModel, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(userArr),
        } as any);
        const users = await userRepository.readAll();
        expect(users).toEqual(userArr);
    });

    it('should return user by login', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(
            (filter?: FilterQuery<UserDocument>) => {
                let result: any = null;
                if (filter) {
                    const login = filter.login;
                    const [user] = userArr.filter(
                        (user) => user.login === login,
                    );
                    result = user ?? null;
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const user = await userRepository.readByLogin(mockUser.login);
        expect(user).toEqual(mockUser);
    });

    it('should return user by email', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(
            (filter?: FilterQuery<UserDocument>) => {
                let result: any = null;
                if (filter) {
                    const email = filter.email;
                    const [user] = userArr.filter(
                        (user) => user.email === email,
                    );
                    result = user ?? null;
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const user = await userRepository.readByEmail(mockUser.email);
        expect(user).toEqual(mockUser);
    });

    it('should update user by login', async () => {
        let users = [...userArr];
        jest.spyOn(userModel, 'updateOne').mockImplementation(
            (
                filter?: FilterQuery<UserDocument>,
                update?: UpdateQuery<UpdateUserDto>,
            ) => {
                let result: any = { acknowledged: false };
                if (filter && update && update.$set) {
                    const login = filter.login;
                    const data = update.$set;
                    const isExist = userArr.some(
                        (user) => user.login === login,
                    );
                    if (!isExist)
                        result = { acknowledged: true, modifiedCount: 0 };
                    else {
                        const array = users.filter(
                            (user) => user.login !== login,
                        );
                        let [user] = users.filter(
                            (user) => user.login === login,
                        );
                        user = {
                            ...user,
                            ...data,
                        };
                        users = [...array, user];
                        result = {
                            modifiedCount: 1,
                            acknowledged: true,
                        };
                    }
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        jest.spyOn(userModel, 'findOne').mockImplementation(
            (filter?: FilterQuery<UserDocument>) => {
                let result: any = null;
                if (filter) {
                    const login = filter.login;
                    const [user] = users.filter((user) => user.login === login);
                    result = user ?? null;
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const isUpdated = await userRepository.updateByLogin(
            mockUser.login,
            updateUser_1,
        );
        const user = await userRepository.readByLogin(mockUser.login);
        expect(isUpdated).toEqual(true);
        expect(user).toEqual(updatedUser_1);
    });

    it('should update user by email', async () => {
        let users = [...userArr];
        jest.spyOn(userModel, 'updateOne').mockImplementation(
            (
                filter?: FilterQuery<UserDocument>,
                update?: UpdateQuery<UpdateUserDto>,
            ) => {
                let result: any = { acknowledged: false };
                if (filter && update && update.$set) {
                    const email = filter.email;
                    const data = update.$set;
                    const isExist = userArr.some(
                        (user) => user.email === email,
                    );
                    if (!isExist)
                        result = { acknowledged: true, modifiedCount: 0 };
                    else {
                        const array = users.filter(
                            (user) => user.email !== email,
                        );
                        let [user] = users.filter(
                            (user) => user.email === email,
                        );
                        user = {
                            ...user,
                            ...data,
                        };
                        users = [...array, user];
                        result = {
                            modifiedCount: 1,
                            acknowledged: true,
                        };
                    }
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        jest.spyOn(userModel, 'findOne').mockImplementation(
            (filter?: FilterQuery<UserDocument>) => {
                let result: any = null;
                if (filter) {
                    const email = filter.email;
                    const [user] = users.filter((user) => user.email === email);
                    result = user ?? null;
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const isUpdated = await userRepository.updateByEmail(
            mockUser.email,
            updateUser_1,
        );
        const user = await userRepository.readByEmail(updatedUser_1.email);
        expect(isUpdated).toEqual(true);
        expect(user).toEqual(updatedUser_1);
    });

    it('should delete user by login', async () => {
        jest.spyOn(userModel, 'deleteOne').mockImplementation(
            (filter?: FilterQuery<UserDocument>) => {
                let result: any = { acknowledged: false, deletedCount: 0 };
                if (filter) {
                    const login = filter.login;
                    const isExist = userArr.some(
                        (user) => user.login === login,
                    );
                    const count = isExist ? 1 : 0;
                    result = {
                        deletedCount: count,
                        acknowledged: true,
                    };
                    return {
                        exec: jest.fn().mockResolvedValueOnce(result),
                    } as any;
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const isDeleted = await userRepository.deleteByLogin(mockUser.login);
        expect(isDeleted).toEqual(true);
    });

    it('should delete user by email', async () => {
        jest.spyOn(userModel, 'deleteOne').mockImplementation(
            (filter?: FilterQuery<UserDocument>) => {
                let result: any = { acknowledged: false, deletedCount: 0 };
                if (filter) {
                    const email = filter.email;
                    const isExist = userArr.some(
                        (user) => user.email === email,
                    );
                    const count = isExist ? 1 : 0;
                    result = {
                        deletedCount: count,
                        acknowledged: true,
                    };
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const isDeleted = await userRepository.deleteByEmail(mockUser.email);
        expect(isDeleted).toEqual(true);
    });
});
