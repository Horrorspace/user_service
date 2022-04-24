import { ObjectId as objectId } from 'mongoose';

export class CreateRefreshTokenDto {
    public readonly userId: objectId;
    public readonly token: string;
    public readonly fingerprint?: string;
    public readonly userAgeng: string;
    public readonly ip: string;
    public readonly expiresIn: number;
}
