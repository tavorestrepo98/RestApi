import { Schema, model, Document } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    estado: boolean;
    google: boolean
}

interface IUserDoc extends IUser, Document {}

const UserSchemaFields: Record<keyof IUser, any> =  {
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true],
        unique: true
    },
    password: {
        type: String,
        required: [true]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true],
        enum: ['ADMIN', 'USER', 'VENTAS']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
}

const UserSchema: Schema<IUserDoc> = new Schema(UserSchemaFields);

UserSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

export default model('User', UserSchema);