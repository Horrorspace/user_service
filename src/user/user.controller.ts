import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUserRes } from './interfaces/IUserRes';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @MessagePattern('getUserByEmail')
    async getUserByEmail(@Payload() email: string): Promise<IUserRes> {
        return this.userService.getUserByEmail(email);
    }
}
