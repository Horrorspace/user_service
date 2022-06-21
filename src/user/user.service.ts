import { Injectable, Inject } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './queries/impl/get-user-by-email.query';
import { GetUserByLoginQuery } from './queries/impl/get-user-by-login.query';
import { CreateUserByEmailCommand } from './commands/impl/create-user-by-email.command';
import { DeleteUserByLoginCommand } from './commands/impl/delete-user-by-login.command';
import { IUserRes } from './interfaces/IUserRes';
import { IRes } from './interfaces/IRes';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(CommandBus) private readonly commandBus: CommandBus,
    ) {}

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

    async createUserByEmail(userToCreate: CreateUserDto): Promise<IUserRes> {
        return await this.commandBus.execute<
            CreateUserByEmailCommand,
            IUserRes
        >(new CreateUserByEmailCommand(userToCreate));
    }

    async deleteUserByLogin(login: string): Promise<IRes> {
        return await this.commandBus.execute<DeleteUserByLoginCommand, IRes>(
            new DeleteUserByLoginCommand(login),
        );
    }
}
