import { Schema, model, Types } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    focusAreas: [{ type: String }],
    recommendedFor: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model('Workout', workoutSchema);
