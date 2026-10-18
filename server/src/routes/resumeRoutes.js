const express = require('express');
const router = express.Router();
const { getResumePdf, getResumeDocx } = require('../controllers/resumeController');

/**
 * @route   GET /api/resume/pdf
 * @desc    Download PDF format resume
 * @access  Public
 */
router.get('/pdf', getResumePdf);

/**
 * @route   GET /api/resume/docx
 * @desc    Download DOCX format resume
 * @access  Public
 */
router.get('/docx', getResumeDocx);

module.exports = router;
