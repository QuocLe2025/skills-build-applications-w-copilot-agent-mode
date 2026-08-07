import { Schema, model, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    coach: { type: Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model('Team', teamSchema);
