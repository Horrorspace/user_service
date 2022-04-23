import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema, ObjectId as objectId } from 'mongoose';
import { User, userName } from '../../user/schemas/user.schema';

export type RefreshTokenDocument = RefreshToken & Document;

const { ObjectId } = MongoShema.Types;

@Schema()
export class RefreshToken {
    _id: objectId;

    @Prop({ type: ObjectId, ref: userName })
    userId: User;

    @Prop()
    token: string;

    @Prop()
    fingerprint: string;

    @Prop()
    userAgeng: string;

    @Prop()
    ip: string;

    @Prop(Date)
    createdAt: Date;

    @Prop()
    expiresIn: number;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

export const refreshTokenName = 'RefreshToken';
