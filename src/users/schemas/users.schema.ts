import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document{

    @Prop({unique: [true,'duplicate email entered'], required: [true , 'email is required']})
    email: string;

    @Prop({required: [true, 'password is required']})
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
