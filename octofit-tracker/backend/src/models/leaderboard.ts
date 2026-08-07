import { Schema, model, Types } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model('LeaderboardEntry', leaderboardEntrySchema);
