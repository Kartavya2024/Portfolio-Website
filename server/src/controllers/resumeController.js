const fs = require('fs');
const path = require('path');
const {
  PDF_PATH,
  DOCX_PATH,
  generatePDF,
  generateDOCX,
} = require('../utils/generateResumes');

// Helper to locate resume files across different deployment environments (Vercel serverless, local, Docker)
const findFilePath = (defaultPath, filename) => {
  const candidates = [
    defaultPath,
    path.resolve(__dirname, '../../resumes', filename),
    path.resolve(process.cwd(), 'server/resumes', filename),
    path.resolve(process.cwd(), 'client/dist/resumes', filename),
    path.resolve(process.cwd(), 'client/public/resumes', filename),
    path.join('/tmp', filename),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch (_) {}
  }
  return defaultPath;
};

/**
 * @desc    Download Kartavya's Resume in PDF format
 * @route   GET /api/resume/pdf
 * @access  Public
 */
const getResumePdf = async (req, res, next) => {
  try {
    let resolvedPath = findFilePath(PDF_PATH, 'Kartavya_Garhwal_Resume.pdf');

    // If file does not exist, generate it on demand
    if (!fs.existsSync(resolvedPath)) {
      console.log('PDF resume not found, generating now...');
      try {
        await generatePDF();
      } catch (genErr) {
        console.warn('PDF on-demand generation warning:', genErr.message);
      }
      resolvedPath = findFilePath(PDF_PATH, 'Kartavya_Garhwal_Resume.pdf');
    }

    if (!fs.existsSync(resolvedPath)) {
      return res.status(404).json({
        success: false,
        error: 'Resume PDF file is temporarily unavailable.',
      });
    }

    const stat = fs.statSync(resolvedPath);
    const filename = 'Kartavya_Garhwal_Resume.pdf';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stat.size);

    const fileStream = fs.createReadStream(resolvedPath);
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
    let resolvedPath = findFilePath(DOCX_PATH, 'Kartavya_Garhwal_Resume.docx');

    // If file does not exist, generate it on demand
    if (!fs.existsSync(resolvedPath)) {
      console.log('DOCX resume not found, generating now...');
      try {
        await generateDOCX();
      } catch (genErr) {
        console.warn('DOCX on-demand generation warning:', genErr.message);
      }
      resolvedPath = findFilePath(DOCX_PATH, 'Kartavya_Garhwal_Resume.docx');
    }

    if (!fs.existsSync(resolvedPath)) {
      return res.status(404).json({
        success: false,
        error: 'Resume Word DOCX file is temporarily unavailable.',
      });
    }

    const stat = fs.statSync(resolvedPath);
    const filename = 'Kartavya_Garhwal_Resume.docx';

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stat.size);

    const fileStream = fs.createReadStream(resolvedPath);
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
