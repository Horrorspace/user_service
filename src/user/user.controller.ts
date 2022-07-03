import { Controller, Inject, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUserRes } from './interfaces/IUserRes';
import { IRes } from './interfaces/IRes';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';
import { GetUserByLoginDto } from './dto/get-user-by-login.dto';
import { JsonPipe } from './pipes/json.pipe';
import { ValidationPipe } from './pipes/validation.pipe';
import { JsonInterceptor } from './interceptors/json.interceptor';

@Controller()
@UseInterceptors(new JsonInterceptor())
@UsePipes(new JsonPipe(), new ValidationPipe())
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @MessagePattern('getUserByEmail')
    async getUserByEmail(
        @Payload() { email }: GetUserByEmailDto,
    ): Promise<IUserRes> {
        console.debug('email', email);
        return this.userService.getUserByEmail(email);
    }

    @MessagePattern('getUserByLogin')
    async getUserByLogin(
        @Payload() { login }: GetUserByLoginDto,
    ): Promise<IUserRes> {
        return this.userService.getUserByLogin(login);
    }

    @MessagePattern('createUserByEmail')
    async createUserByEmail(
        @Payload()
        userToCreate: CreateUserDto,
    ): Promise<IUserRes> {
        return await this.userService.createUserByEmail(userToCreate);
    }

    @MessagePattern('deleteUserByLogin')
    async deleteUserByLogin(
        @Payload() { login }: GetUserByLoginDto,
    ): Promise<IRes> {
        return await this.userService.deleteUserByLogin(login);
    }
}
