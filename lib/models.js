import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  sessions: Array
});

const user = mongoose.model('users', userSchema);

export default {user, sessions};