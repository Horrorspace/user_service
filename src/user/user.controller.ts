import {
    Controller,
    Inject,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUserRes } from './interfaces/IUserRes';
import { IRes } from './interfaces/IRes';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe'

@Controller()
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @MessagePattern('getUserByEmail')
    async getUserByEmail(@Payload() email: string): Promise<IUserRes> {
        return this.userService.getUserByEmail(email);
    }

    @MessagePattern('getUserByLogin')
    async getUserByLogin(@Payload() login: string): Promise<IUserRes> {
        return this.userService.getUserByEmail(login);
    }

    @MessagePattern('createUserByEmail')
    async createUserByEmail(@Payload(new CreateUserPipe()) userToCreate: CreateUserDto): Promise<IUserRes> {
        return await this.userService.createUserByEmail(userToCreate);
    }

    @MessagePattern('deleteUserByLogin')
    async deleteUserByLogin(@Payload() login: string): Promise<IRes> {
        return await this.userService.deleteUserByLogin(login);
    }
}
