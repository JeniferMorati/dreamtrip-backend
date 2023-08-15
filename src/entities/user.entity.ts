import { Document, Schema, model } from "mongoose";
import { AuthRole } from "@providers/roles/roles.provider";
import { IUser } from "./interfaces/user.entity.interface";

type UserDocument = Document & IUser;

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    nickName: {
      type: String,
      required: [true, "Nick name is required"],
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
      match: [
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
        "Invalid date format",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    image: {
      type: String,
      required: false,
      select: true,
    },
    imageVersion: {
      type: String,
      required: false,
      select: true,
    },
    roles: {
      type: [String],
      enum: Object.values(AuthRole),
      required: true,
      default: [AuthRole.User],
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// The actual model in which we instantiate the user
const User = model<IUser>("User", userSchema);

export { User, IUser, UserDocument };
