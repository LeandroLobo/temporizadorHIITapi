import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  name: String,
  sessions: Array
});

const userData = mongoose.model('users', userDataSchema);

export default {userData};