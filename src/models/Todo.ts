import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed?: boolean;
  userId?: number;
}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<ITodo>("Todo", todoSchema);
