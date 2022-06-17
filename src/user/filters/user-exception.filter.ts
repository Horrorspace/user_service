import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IErrorRes, codeRes } from '../interfaces/IErrorRes';
import { statuses } from '../enums/statuses.enum';
import { IError } from '../interfaces/IError';
import { LoggerService } from '../../logger/logger.service';

@Catch(RpcException)
export class UserExceptionFilter implements RpcExceptionFilter<RpcException> {
    constructor(private readonly loggerService: LoggerService) {}

    public catch(exception: RpcException): Observable<any> {
        const error = exception.getError() as IError;
        const message = error.code;
        const res: IErrorRes = {
            message,
            status: statuses.error,
        };
        const resStr = JSON.stringify(res);
        const errStr = `user_service: ${error.reason}`;
        this.loggerService.error(errStr);
        return of(resStr);
    }
}
