import mongoose from "mongoose";

// An interface that describes the properties that are required to create new User;
interface UserAttrs {
  email: string;
  password: string
}

// An interface that describes the properties that a User model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//  An interface that describes the properties that a User Document has.
//  Properties a single User has.

interface UserDoc extends mongoose.Document {
  email: string;
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  
});

userSchema.statics.build = (attrs: UserAttrs) =>
  new User(attrs);

const User = mongoose.model<UserDoc, UserModel>(
  "User",
  userSchema
);

export { User };