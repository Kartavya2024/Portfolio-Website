const fs = require('fs');
const path = require('path');
const {
  PDF_PATH,
  DOCX_PATH,
  generatePDF,
  generateDOCX,
} = require('../utils/generateResumes');

/**
 * @desc    Download Kartavya's Resume in PDF format
 * @route   GET /api/resume/pdf
 * @access  Public
 */
const getResumePdf = async (req, res, next) => {
  try {
    // If file does not exist, generate it on demand
    if (!fs.existsSync(PDF_PATH)) {
      console.log('PDF resume not found, generating now...');
      await generatePDF();
    }

    if (!fs.existsSync(PDF_PATH)) {
      return res.status(404).json({
        success: false,
        error: 'Resume PDF file is temporarily unavailable.',
      });
    }

    const stat = fs.statSync(PDF_PATH);
    const filename = 'Kartavya_Garhwal_Resume.pdf';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stat.size);

    const fileStream = fs.createReadStream(PDF_PATH);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving PDF resume:', error);
    next(error);
  }
};

/**
 * @desc    Download Kartavya's Resume in DOCX format
 * @route   GET /api/resume/docx
 * @access  Public
 */
const getResumeDocx = async (req, res, next) => {
  try {
    // If file does not exist, generate it on demand
    if (!fs.existsSync(DOCX_PATH)) {
      console.log('DOCX resume not found, generating now...');
      await generateDOCX();
    }

    if (!fs.existsSync(DOCX_PATH)) {
      return res.status(404).json({
        success: false,
        error: 'Resume Word DOCX file is temporarily unavailable.',
      });
    }

    const stat = fs.statSync(DOCX_PATH);
    const filename = 'Kartavya_Garhwal_Resume.docx';

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stat.size);

    const fileStream = fs.createReadStream(DOCX_PATH);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving DOCX resume:', error);
    next(error);
  }
};

module.exports = {
  getResumePdf,
  getResumeDocx,
};
