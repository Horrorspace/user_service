import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';
import { codes } from '../enums/codes.enum';
import { IError } from '../interfaces/IError';

@Injectable()
export class ValidationPipe implements PipeTransform {
    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    public async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const error: IError = {
                code: codes.badRequest,
                reason: 'there is not valid value',
            };
            throw new RpcException(error);
        }
        return value;
    }
}
