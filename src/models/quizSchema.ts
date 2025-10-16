import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  roadmapName: string;
  subject: string;
  quizData: string;
  userId: string;
  score: number;
}

const QuizSchema: Schema = new Schema(
  {
    roadmapName: { type: String, required: true },
    subject: { type: String, required: true },
    quizData: { type: String, required: true },
    userId: { type: String, required: true },
    score: { type: Number, required: false },
  },
  { timestamps: true }
);

export const Quiz =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);
