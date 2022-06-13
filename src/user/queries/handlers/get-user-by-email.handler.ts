import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { GetUserByEmailQuery } from '../impl/get-user-by-email.query';
import { UserModel } from '../../../user/models/user.model';
import { IUserRes } from '../../../user/interfaces/IUserRes';
import { codes } from 'src/user/enums/codes.enum';
import { statuses } from 'src/user/enums/statuses.enum';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
    implements IQueryHandler<GetUserByEmailQuery>
{
    constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

    async execute(query: GetUserByEmailQuery): Promise<IUserRes> {
        try {
            const { email } = query;
            const user = await this.userModel.readByEmail(email);
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
