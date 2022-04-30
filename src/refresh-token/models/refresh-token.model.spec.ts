import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery, Schema } from 'mongoose';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshToken, RefreshTokenDocument, refreshTokenName } from '../schemas/refresh-token.schema';
import { UserDocument, User, userName } from '../../user/schemas/user.schema';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import getCurrentDate from '../../utils/getCurrentDate';

const { ObjectId } = Schema.Types;

describe('RefreshTokenModel', () => {
    jest.mock('');
    let refreshTokenRepository: RefreshTokenModel;
    let refreshTokenModel: Model<RefreshToken>;

    const createdAt = getCurrentDate();
    const mockRefreshToken: RefreshToken = {
        _id: new ObjectId('1'),
        userId: new ObjectId('21'),
        token: 'KIAJFklwqgaF',
        fingerprint: null,
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.3',
        ip: '127.0.0.1',
        createdAt,
        expiresIn: 1000,
    };
    const mockRefreshToken_1: RefreshToken = {
        _id: new ObjectId('3'),
        userId: new ObjectId('21'),
        token: 'KLGJewlkgwe',
        fingerprint: null,
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.4',
        ip: '192.168.0.2',
        createdAt,
        expiresIn: 1000,
    };
    const mockRefreshToken_2: RefreshToken = {
        _id: new ObjectId('2'),
        userId: new ObjectId('22'),
        token: 'KGjwqgmiwq',
        fingerprint: null,
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/48.3',
        ip: '192.168.0.1',
        createdAt,
        expiresIn: 1000,
    };
    const createRefreshToken: CreateRefreshTokenDto = {
        userId: new ObjectId('21'),
        token: 'KIAJFklwqgaF',
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.3',
        ip: '127.0.0.1',
        expiresIn: 1000,
    };
    const userTokensArr = [mockRefreshToken, mockRefreshToken_1];
    const tokenArr = [mockRefreshToken, mockRefreshToken_1, mockRefreshToken_2];
    const mockUser: User = {
        _id: new ObjectId('1'),
        login: 'tester',
        email: 'tester@test.com',
        password: '111111111',
        phone: null,
        confirmationCode: null,
        confirmed: false,
        registrationDate: createdAt,
    };
    
    beforeEach(async () => {
        console.debug('testTest');
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshTokenModel,
                {
                    provide: getModelToken(refreshTokenName),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockRefreshToken),
                        constructor: jest.fn().mockResolvedValue(mockRefreshToken),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        updateOne: jest.fn(),
                        deleteOne: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
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
            ],
        }).compile();
        
        refreshTokenModel = module.get(getModelToken(refreshTokenName));
        refreshTokenRepository = module.get(RefreshTokenModel);
    });

    it('should be defined', () => {
        expect(refreshTokenRepository).toBeDefined();
    });

    it('should return all tokens', async () => {
        jest.spyOn(refreshTokenModel, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(tokenArr),
        } as any);
        const tokens = await refreshTokenRepository.readAll();
        expect(tokens).toEqual(tokenArr);
    });

    it('should return tokens by userId', async () => {
        jest.spyOn(refreshTokenModel, 'find').mockImplementation(
            (filter?: FilterQuery<RefreshTokenDocument>) => {
                let result: any = [];
                if (filter) {
                    const userId = filter.userId;
                    const userTokensArr = tokenArr.filter(
                        (data) => data.userId === userId,
                    );
                    result = userTokensArr;
                }
                return {
                    exec: jest.fn().mockResolvedValueOnce(result),
                } as any;
            },
        );
        const userId = new ObjectId('21');
        const result = await refreshTokenRepository.readByUserId(userId);
        expect(result).toEqual(userTokensArr);
    });
})