import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../impl/get-user-by-email.query';
import { UserModel } from '../../../user/models/user.model';
import { IUserRes } from '../../../user/interfaces/IUserRes';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
    implements IQueryHandler<GetUserByEmailQuery>
{
    constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

    async execute(query: GetUserByEmailQuery): Promise<IUserRes> {
        try {
            const { email } = query;
            const user = await this.userModel.readByEmail(email);
            if (user) return user;
            else return '404';
        } catch (e) {
            return '500';
        }
    }
}
