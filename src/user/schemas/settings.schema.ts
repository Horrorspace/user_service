import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoShema } from 'mongoose';
import { User, userName } from './user.schema';

export type SettingsDocument = Settings & Document;

const { ObjectId } = MongoShema.Types;

@Schema()
export class Settings {
    @Prop({ type: ObjectId, ref: userName })
    userId: User;

    @Prop()
    language: string;

    @Prop()
    timezone: string;

    @Prop()
    sound: boolean;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

export const settingsName = 'Settings';
