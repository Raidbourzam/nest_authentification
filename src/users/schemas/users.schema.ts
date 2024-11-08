import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document{
    [x: string]: any;
    @Prop({unique: true,required: true})
    email: string;

    @Prop({required: true})
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
