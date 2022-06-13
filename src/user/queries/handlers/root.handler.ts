import { GetUserByEmailHandler } from './get-user-by-email.handler';
import { GetUserByLoginHandler } from './get-user-by-login.handler';

export const QueryHandlers = [GetUserByEmailHandler, GetUserByLoginHandler];
