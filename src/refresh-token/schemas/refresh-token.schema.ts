import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema, ObjectId as objectId } from 'mongoose';
import { User, userName } from '../../user/schemas/user.schema';
import getCurrentDate from '../../utils/getCurrentDate';

export type RefreshTokenDocument = RefreshToken & Document;

const { ObjectId } = MongoShema.Types;

@Schema()
export class RefreshToken {
    _id: objectId;

    @Prop({ type: ObjectId, ref: userName })
    userId: objectId;

    @Prop({ required: true, unique: true })
    token: string;

    @Prop({type: String, default: null})
    fingerprint: string | null;

    @Prop({ required: true })
    userAgent: string;

    @Prop({ required: true })
    ip: string;

    @Prop({ type: Date, default: getCurrentDate() })
    createdAt: Date;

    @Prop({ required: true })
    expiresIn: number;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

export const refreshTokenName = 'RefreshToken';
