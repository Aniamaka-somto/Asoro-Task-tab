import TaskReport from '../models/TaskReport.js';

// @desc    Get all task reports
// @route   GET /api/reports
// @access  Public
const getReports = async (req, res) => {
  try {
    const reports = await TaskReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task report
// @route   GET /api/reports/:id
// @access  Public
const getReportById = async (req, res) => {
  try {
    const report = await TaskReport.findById(req.params.id);
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new task report
// @route   POST /api/reports
// @access  Public
const createReport = async (req, res) => {
  try {
    const { date, project, taskDescription, hoursSpent, status } = req.body;

    const report = await TaskReport.create({
      date,
      project,
      taskDescription,
      hoursSpent,
      status,
      submitted: true,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update task report
// @route   PUT /api/reports/:id
// @access  Public
const updateReport = async (req, res) => {
  try {
    const report = await TaskReport.findById(req.params.id);

    if (report) {
      const { date, project, taskDescription, hoursSpent, status } = req.body;

      report.date = date || report.date;
      report.project = project || report.project;
      report.taskDescription = taskDescription || report.taskDescription;
      report.hoursSpent = hoursSpent || report.hoursSpent;
      report.status = status || report.status;

      const updatedReport = await report.save();
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete task report
// @route   DELETE /api/reports/:id
// @access  Public
const deleteReport = async (req, res) => {
  try {
    const report = await TaskReport.findById(req.params.id);

    if (report) {
      await report.deleteOne();
      res.json({ message: 'Report removed' });
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add attachment to report
// @route   POST /api/reports/:id/attachments
// @access  Public
const addAttachment = async (req, res) => {
  try {
    const report = await TaskReport.findById(req.params.id);

    if (report) {
      if (req.file) {
        report.attachments.push({
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
        });

        const updatedReport = await report.save();
        res.json(updatedReport);
      } else {
        res.status(400).json({ message: 'No file uploaded' });
      }
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  addAttachment,
};
