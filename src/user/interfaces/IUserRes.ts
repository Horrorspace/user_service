import { User } from '../schemas/user.schema';
import { IStatus } from './IStatus';

export interface IUserRes extends IStatus {
    message: User;
}
