import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema } from 'mongoose';
import { RefreshToken } from './refresh-token.schema';
import { Settings } from './settings.schema';

export type UserDocument = User & Document;

const { ObjectId } = MongoShema.Types;

@Schema()
export class User {
    @Prop()
    login: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string | null;

    @Prop()
    confirmationCode: string | null;

    @Prop()
    confirmed: boolean;

    @Prop({ type: [ObjectId], ref: RefreshToken.name })
    refreshTokens: RefreshToken[];

    @Prop({ type: ObjectId, ref: Settings.name })
    settings: Settings;
}

export const UserSchema = SchemaFactory.createForClass(User);
