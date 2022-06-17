import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CreateUserByEmailCommand } from '../impl/create-user-by-email.command';
import { UserModel } from '../../../user/models/user.model';
import { IUserRes } from '../../../user/interfaces/IUserRes';
import { codes } from 'src/user/enums/codes.enum';
import { statuses } from 'src/user/enums/statuses.enum';
import { IError } from '../../interfaces/IError';

@CommandHandler(CreateUserByEmailCommand)
export class CreateUserByEmailHandler
    implements ICommandHandler<CreateUserByEmailCommand>
{
    constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

    async execute(query: CreateUserByEmailCommand): Promise<IUserRes> {
        try {
            const { userToCreate } = query;
            const user = await this.userModel.createByEmail(userToCreate);
            return {
                status: statuses.success,
                message: user,
            };
        } catch (e) {
            const error: IError = {
                code: codes.serverErr,
                reason: `${e}`,
            };
            throw new RpcException(error);
        }
    }
}
