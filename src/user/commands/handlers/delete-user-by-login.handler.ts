import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { DeleteUserByLoginCommand } from '../impl/delete-user-by-login.command';
import { UserModel } from '../../../user/models/user.model';
import { IRes } from '../../../user/interfaces/IRes';
import { codes } from 'src/user/enums/codes.enum';
import { statuses } from 'src/user/enums/statuses.enum';
import { IError } from '../../interfaces/IError';

@CommandHandler(DeleteUserByLoginCommand)
export class DeleteUserByLoginHandler
    implements ICommandHandler<DeleteUserByLoginCommand>
{
    constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

    async execute(query: DeleteUserByLoginCommand): Promise<IRes> {
        try {
            const { login } = query;
            const user = await this.userModel.deleteByLogin(login);
            if (!user) throw new Error('removal failed')
            return {
                status: statuses.success,
                message: '',
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
