import mongoose from "mongoose";

const userScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", userScema);
