import { PipeTransform, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { codes } from 'src/user/enums/codes.enum';

@Injectable()
export class CreateUserPipe implements PipeTransform {
    public transform(value: any): CreateUserDto {
        if (typeof value === 'string') {
            const data = JSON.parse(value) as CreateUserDto;
            if (!data.hasOwnProperty('login')) {
                throw new RpcException(codes.badRequest);
            }
            if (!data.hasOwnProperty('email')) {
                throw new RpcException(codes.badRequest);
            }
            if (!data.hasOwnProperty('password')) {
                throw new RpcException(codes.badRequest);
            }
            if (typeof data.login !== 'string') {
                throw new RpcException(codes.badRequest);
            }
            if (typeof data.email !== 'string') {
                throw new RpcException(codes.badRequest);
            }
            if (typeof data.password !== 'string') {
                throw new RpcException(codes.badRequest);
            }
            return data;
        } else throw new RpcException(codes.badRequest);
    }
}
