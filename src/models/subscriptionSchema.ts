import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  plan: { type: String, enum: ["free", "pro", "team"], default: "free" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  price: { type: Number, required: true },
  discountCode: { type: String, default: null },
  transactionId: { type: String, default: "" },
});

export const Subscription =
  mongoose.models?.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
