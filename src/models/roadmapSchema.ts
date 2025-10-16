import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },

  roadmap: { type: mongoose.Schema.Types.Mixed, default: {} },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Roadmap =
  mongoose.models?.Roadmap || mongoose.model("Roadmap", roadmapSchema);
