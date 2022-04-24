import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema, ObjectId as objectId } from 'mongoose';
// import { Settings, settingsName } from './settings.schema';
import getCurrentDate from '../../utils/getCurrentDate';

export type UserDocument = User & Document;

@Schema()
export class User {
    _id: objectId;

    @Prop({ required: true, unique: true })
    login: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, default: null })
    phone: string | null;

    @Prop({ type: String, default: null })
    confirmationCode: string | null;

    @Prop({ default: false })
    confirmed: boolean;

    @Prop({ type: Date, default: getCurrentDate() })
    registrationDate: Date;

    // @Prop({ type: ObjectId, ref: settingsName })
    // settings: Settings | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const userName = 'User';
