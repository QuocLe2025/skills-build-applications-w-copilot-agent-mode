import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Workout from '../models/workout.js';
import LeaderboardEntry from '../models/leaderboard.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany(),
      Team.deleteMany(),
      Activity.deleteMany(),
      Workout.deleteMany(),
      LeaderboardEntry.deleteMany(),
    ]);

    const users = await User.insertMany([
      { username: 'fituser', email: 'fituser@example.com', password: 'password123' },
      { username: 'runner42', email: 'runner42@example.com', password: 'runfast42' },
      { username: 'coachjane', email: 'coachjane@example.com', password: 'coachsecure' },
      { username: 'yogaemma', email: 'yogaemma@example.com', password: 'calmflow' },
      { username: 'cycleking', email: 'cycleking@example.com', password: 'pedalpower' },
    ]);

    await Workout.insertMany([
      {
        name: 'Full-body Strength',
        description: 'A balanced strength routine for all major muscle groups.',
        durationMinutes: 40,
        difficulty: 'intermediate',
        focusAreas: ['strength', 'core', 'mobility'],
        recommendedFor: [users[0]._id, users[2]._id],
      },
      {
        name: 'HIIT Burn',
        description: 'High intensity interval training to boost endurance and calorie burn.',
        durationMinutes: 30,
        difficulty: 'advanced',
        focusAreas: ['cardio', 'power'],
        recommendedFor: [users[1]._id, users[4]._id],
      },
      {
        name: 'Recovery Stretch',
        description: 'Gentle stretching for recovery after a hard workout.',
        durationMinutes: 20,
        difficulty: 'beginner',
        focusAreas: ['flexibility', 'relaxation'],
        recommendedFor: [users[3]._id, users[0]._id],
      },
      {
        name: 'Endurance Ride',
        description: 'A long-distance cycling plan to build stamina.',
        durationMinutes: 55,
        difficulty: 'intermediate',
        focusAreas: ['endurance', 'cycling'],
        recommendedFor: [users[4]._id],
      },
    ]);

    await Team.insertMany([
      {
        name: 'Morning Marathoners',
        description: 'Early birds who hit the pavement before sunrise.',
        coach: users[2]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Sunset Sprinters',
        description: 'A fast-paced group training for speed and intervals.',
        coach: users[2]._id,
        members: [users[1]._id, users[4]._id],
      },
      {
        name: 'Core Crushers',
        description: 'Focused on strength, balance, and strong midsections.',
        coach: users[3]._id,
        members: [users[0]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        distanceKm: 8.2,
        durationMinutes: 54,
        caloriesBurned: 520,
        date: new Date('2026-07-28T06:15:00Z'),
        notes: 'Morning tempo run with strong finish.',
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        distanceKm: 27.4,
        durationMinutes: 72,
        caloriesBurned: 820,
        date: new Date('2026-07-27T18:20:00Z'),
        notes: 'Evening endurance ride with hills.',
      },
      {
        user: users[3]._id,
        type: 'Yoga',
        durationMinutes: 45,
        caloriesBurned: 210,
        date: new Date('2026-07-28T20:00:00Z'),
        notes: 'Deep stretch and mobility flow.',
      },
      {
        user: users[4]._id,
        type: 'Cycling',
        distanceKm: 18.5,
        durationMinutes: 65,
        caloriesBurned: 670,
        date: new Date('2026-07-26T16:00:00Z'),
        notes: 'Interval ride with power surges.',
      },
      {
        user: users[2]._id,
        type: 'Strength Training',
        durationMinutes: 50,
        caloriesBurned: 480,
        date: new Date('2026-07-25T07:00:00Z'),
        notes: 'Coach-led circuit session.',
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, points: 1620, rank: 1 },
      { user: users[1]._id, points: 1490, rank: 2 },
      { user: users[4]._id, points: 1410, rank: 3 },
      { user: users[3]._id, points: 1325, rank: 4 },
    ]);

    console.log('Created test users, teams, activities, leaderboard entries, and workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
