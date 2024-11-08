import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    [x: string]: any;
    @Prop({unique: true,required: true})
    email: string;

    @Prop({required: true})
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
