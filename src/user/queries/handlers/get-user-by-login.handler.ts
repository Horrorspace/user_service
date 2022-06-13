import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { GetUserByLoginQuery } from '../impl/get-user-by-login.query';
import { UserModel } from '../../../user/models/user.model';
import { IUserRes } from '../../../user/interfaces/IUserRes';
import { codes } from 'src/user/enums/codes.enum';
import { statuses } from 'src/user/enums/statuses.enum';

@QueryHandler(GetUserByLoginQuery)
export class GetUserByEmailHandler
    implements IQueryHandler<GetUserByLoginQuery>
{
    constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

    async execute(query: GetUserByLoginQuery): Promise<IUserRes> {
        try {
            const { login } = query;
            const user = await this.userModel.readByLogin(login);
            if (user)
                return {
                    status: statuses.success,
                    message: user,
                };
            else throw new RpcException(codes.notFound);
        } catch (e) {
            throw new RpcException(codes.serverErr);
        }
    }
}
