import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema } from 'mongoose';
import { User, userName } from './user.schema';

export type RefreshTokenDocument = RefreshToken & Document;

const { ObjectId } = MongoShema.Types;

@Schema()
export class RefreshToken {
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
