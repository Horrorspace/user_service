import { CreateUserByEmailHandler } from './create-user-by-email.handler';
import { DeleteUserByLoginHandler } from './delete-user-by-login.handler';

export const CommandHandlers = [
    CreateUserByEmailHandler,
    DeleteUserByLoginHandler,
];
