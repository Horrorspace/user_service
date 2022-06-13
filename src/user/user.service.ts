import { Injectable, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './queries/impl/get-user-by-email.query';
import { GetUserByLoginQuery } from './queries/impl/get-user-by-login.query';
import { IUserRes } from './interfaces/IUserRes';

@Injectable()
export class UserService {
    constructor(@Inject(QueryBus) private readonly queryBus: QueryBus) {}

    async getUserByEmail(email: string): Promise<IUserRes> {
        return await this.queryBus.execute<GetUserByEmailQuery, IUserRes>(
            new GetUserByEmailQuery(email),
        );
    }

    async getUserByLogin(login: string): Promise<IUserRes> {
        return await this.queryBus.execute<GetUserByLoginQuery, IUserRes>(
            new GetUserByLoginQuery(login),
        );
    }
}
