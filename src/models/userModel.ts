import mongoose from "mongoose";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "History" }],
  googleId: {
    type: String,
  },
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
