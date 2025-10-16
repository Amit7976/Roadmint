import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["free", "pro", "team"], required: true },
  purchaseDate: { type: Date, default: Date.now },
  amountPaid: { type: Number, required: true },
  discountCode: { type: String, default: null },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "paid",
  },
  transactionId: { type: String, default: "" },
});

export const History =
  mongoose.models?.History || mongoose.model("History", historySchema);
