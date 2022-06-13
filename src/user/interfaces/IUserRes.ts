import { User } from '../schemas/user.schema';

export enum codes {
    notFound = 404,
    serverErr = 500,
}

export type codeRes = `${codes}`;

export type IUserRes = User | codeRes;
