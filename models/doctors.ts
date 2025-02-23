import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document {
  // _id: ObjectId;
  name: string;
  specialty: string;
  city: string;
  photo: string;
  description: string;
  officeLocation: string;
  contactInfo: string;
  }
  
  const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    city: { type: String, required: true },
    photo: { type: String },
    description: { type: String, required: true },
    officeLocation: { type: String, required: true },
    contactInfo: { type: String, required: true },
  });
  
  // Define model type with proper TypeScript support
  type UserModel = mongoose.Model<IUser>;
  
  // Check if the model is already defined to prevent overwriting during hot reloads
  const User = (mongoose.models.User || mongoose.model<IUser>('User', UserSchema)) as UserModel;
  
  export default User;