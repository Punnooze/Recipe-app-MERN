import mongoose, { Schema, mongo } from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model('users', userSchema);
