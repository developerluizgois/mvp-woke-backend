import mongoose, { Document } from 'mongoose';

export interface UserInterface extends Document {
  username: string;
  fullName: string;
  password: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
}, {
  timestamps: true,
});

export default UserSchema;
