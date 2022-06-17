import { User } from '../schemas/user.schema';
import { IStatus } from './IStatus';

export interface IRes extends IStatus {
    message: string;
}
