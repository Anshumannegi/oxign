import mongoose from "mongoose";

const subscribedUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  phoneNumber:{
    type:Number,
    required: [true, "Please provide number"],

  },
  uniqueId:{
    type:String,

  },
  subscriptionDate: {
    type: Date, // Use Date type to store date values
    default: null, // You can set a default value if needed
  },
 
});

const subscribedUsers = mongoose.models.subscribedUsers || mongoose.model("subscribedUsers", subscribedUserSchema);

export default subscribedUsers;
