import { Document, Model, Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import { Password } from "../services/password";


const UserSchema = new Schema<UserDocument, UserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;

      delete ret._id;
      delete ret.password;
      delete ret.__v 
    }
  }
});

// An interface that describes the properties that are required to create new User;
interface UserAttrs {
  email: string;
  password: string;
}

//  An interface that describes the properties that a User Document has.
//  Properties a single User has.
interface UserDocument extends UserAttrs, Document {
  generateToken(): string;
}

// An interface that describes the properties that a User model has.
interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

UserSchema.methods.generateToken = function(): string {
  const token = jwt.sign({id: this.id, email: this.email}, process.env.JWT_KEY!);

  return token;
}

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);

    done();
  }
});

UserSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = model<UserDocument, UserModel>("User", UserSchema);

export { User, UserDocument };
