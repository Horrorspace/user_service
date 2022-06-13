import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserRes } from '../interfaces/IUserRes';

@Injectable()
export class JsonInterceptor implements NestInterceptor<IUserRes, string> {
    public intercept(
        context: ExecutionContext,
        next: CallHandler<IUserRes>,
    ): Observable<string> | Promise<Observable<string>> {
        return next.handle().pipe(map((res) => JSON.stringify(res)));
    }
}
