import mongoose from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password?: string;
}

const UserModel = new mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
    },
    {collection: 'user_data'}
)

export const User = mongoose.model<IUser>('UserData', UserModel)

