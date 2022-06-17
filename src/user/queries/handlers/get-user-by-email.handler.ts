import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { GetUserByEmailQuery } from '../impl/get-user-by-email.query';
import { UserModel } from '../../../user/models/user.model';
import { IUserRes } from '../../../user/interfaces/IUserRes';
import { codes } from '../../enums/codes.enum';
import { statuses } from '../../enums/statuses.enum';
import { IError } from '../../interfaces/IError';

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
            else throw 'not found';
        } catch (e) {
            if (e === 'not found') {
                const error: IError = {
                    code: codes.notFound,
                    reason: `not found`,
                };
                throw new RpcException(error);
            }
            else {
                const error: IError = {
                    code: codes.serverErr,
                    reason: `${e}`,
                };
                throw new RpcException(error);
            }
        }
    }
}
