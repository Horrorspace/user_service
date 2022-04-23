import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema } from 'mongoose';
import { RefreshToken } from './refresh-token.schema';
import { Settings } from './settings.schema';
import getCurrentDate from '../utils/getCurrentDate';

export type UserDocument = User & Document;

const { ObjectId } = MongoShema.Types;

@Schema()
export class User {
    @Prop({ required: true })
    login: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: null })
    phone: string | null;

    @Prop({ default: null })
    confirmationCode: string | null;

    @Prop({ default: false })
    confirmed: boolean;

    @Prop({ type: Date, default: getCurrentDate() })
    registrationDate: Date;

    @Prop({ type: [ObjectId], ref: RefreshToken.name })
    refreshTokens: RefreshToken[];

    @Prop({ type: ObjectId, ref: Settings.name })
    settings: Settings;
}

export const UserSchema = SchemaFactory.createForClass(User);
