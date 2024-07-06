import mongoose from 'mongoose';
import UserSchema, { UserInterface } from '../schemas/user.schema';

const UserModel = mongoose.model<UserInterface>('User', UserSchema);
export default UserModel;
