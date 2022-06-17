import { PipeTransform, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { codes } from 'src/user/enums/codes.enum';
import { IError } from '../interfaces/IError';

@Injectable()
export class CreateUserPipe implements PipeTransform {
    public transform(value: any): CreateUserDto {
        if (typeof value === 'string') {
            const data = JSON.parse(value) as CreateUserDto;
            if (!data.hasOwnProperty('login')) {
                const error: IError = {
                    code: codes.badRequest,
                    reason: 'there is not login field',
                };
                throw new RpcException(error);
            }
            if (!data.hasOwnProperty('email')) {
                const error: IError = {
                    code: codes.badRequest,
                    reason: 'there is not email field',
                };
                throw new RpcException(error);
            }
            if (!data.hasOwnProperty('password')) {
                const error: IError = {
                    code: codes.badRequest,
                    reason: 'there is not password field',
                };
                throw new RpcException(error);
            }
            if (typeof data.login !== 'string') {
                const error: IError = {
                    code: codes.badRequest,
                    reason: 'there is not valide login field',
                };
                throw new RpcException(error);
            }
            if (typeof data.email !== 'string') {
                const error: IError = {
                    code: codes.badRequest,
                    reason: 'there is not valide email field',
                };
                throw new RpcException(error);
            }
            if (typeof data.password !== 'string') {
                const error: IError = {
                    code: codes.badRequest,
                    reason: 'there is not valide password field',
                };
                throw new RpcException(error);
            }
            return data;
        } else {
            const error: IError = {
                code: codes.badRequest,
                reason: 'there is not valid value',
            };
            throw new RpcException(error);
        }
    }
}
