import mongoose, { Schema, Document } from "mongoose";

export interface IExam extends Document {
  roadmapName: string;
  examData: object; // full object (questions, answers, feedback)
  userId: string;
  submitted: boolean; // exam submitted or not
  lastFailedAttempt: Date | null; // last failed attempt timestamp
}

const ExamSchema: Schema = new Schema(
  {
    roadmapName: { type: String, required: true },
    examData: { type: Schema.Types.Mixed, required: true }, // JSON object
    userId: { type: String, required: true },
    submitted: { type: Boolean, default: false },
    lastFailedAttempt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Exam =
  mongoose.models.Exam || mongoose.model<IExam>("Exam", ExamSchema);
