import {
    Controller,
    Inject,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserExceptionFilter } from './filters/user-exception.filter';
import { JsonInterceptor } from './interceptors/json.interceptor';
import { IUserRes } from './interfaces/IUserRes';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @MessagePattern('getUserByEmail')
    @UseFilters(new UserExceptionFilter())
    @UseInterceptors(JsonInterceptor)
    async getUserByEmail(@Payload() email: string): Promise<IUserRes> {
        return this.userService.getUserByEmail(email);
    }

    @MessagePattern('getUserByLogin')
    @UseFilters(new UserExceptionFilter())
    @UseInterceptors(JsonInterceptor)
    async getUserByLogin(@Payload() login: string): Promise<IUserRes> {
        return this.userService.getUserByEmail(login);
    }
}
