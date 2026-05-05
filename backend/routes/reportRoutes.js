import express from 'express';
import {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  addAttachment,
} from '../controllers/reportController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getReports).post(createReport);

router
  .route('/:id')
  .get(getReportById)
  .put(updateReport)
  .delete(deleteReport);

router.post('/:id/attachments', upload.single('attachment'), addAttachment);

export default router;
