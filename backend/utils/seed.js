import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedData = [
  {
    date: new Date(2026, 0, 11),
    project: 'Website Redesign',
    taskDescription: 'Updated homepage layout and navigation components',
    hoursSpent: 4.5,
    status: 'Completed',
    submitted: true,
  },
  {
    date: new Date(2026, 0, 12),
    project: 'Mobile App Development',
    taskDescription: 'Implemented user authentication flow',
    hoursSpent: 3.0,
    status: 'In Progress',
    submitted: true,
  },
  {
    date: new Date(2026, 0, 13),
    project: 'API Integration',
    taskDescription: 'Connected frontend with payment gateway API',
    hoursSpent: 5.5,
    status: 'Pending',
    submitted: false,
  },
  {
    date: new Date(2026, 0, 14),
    project: 'Database Migration',
    taskDescription: 'Migrated user data to new schema',
    hoursSpent: 2.0,
    status: 'Blocked',
    submitted: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    const TaskReport = (await import('./models/TaskReport.js')).default;

    // Clear existing data
    await TaskReport.deleteMany({});
    console.log('Cleared existing reports');

    // Insert seed data
    const inserted = await TaskReport.insertMany(seedData);
    console.log(`${inserted.length} reports seeded successfully!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
