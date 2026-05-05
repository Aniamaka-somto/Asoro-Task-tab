import mongoose from 'mongoose';

const taskReportSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    hoursSpent: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Pending', 'Blocked'],
      required: true,
    },
    attachments: [
      {
        fileName: String,
        filePath: String,
        fileType: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TaskReport = mongoose.model('TaskReport', taskReportSchema);

export default TaskReport;
