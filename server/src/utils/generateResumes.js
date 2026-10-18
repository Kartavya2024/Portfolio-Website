const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');

const RESUMES_DIR = path.resolve(__dirname, '../../resumes');
const PDF_PATH = path.join(RESUMES_DIR, 'Kartavya_Garhwal_Resume.pdf');
const DOCX_PATH = path.join(RESUMES_DIR, 'Kartavya_Garhwal_Resume.docx');

// Ensure resumes directory exists
const ensureDirectoryExists = () => {
  if (!fs.existsSync(RESUMES_DIR)) {
    fs.mkdirSync(RESUMES_DIR, { recursive: true });
  }
};

/**
 * Generates a clean, professional PDF Resume
 */
const generatePDF = () => {
  return new Promise((resolve, reject) => {
    try {
      ensureDirectoryExists();
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 40, bottom: 40, left: 45, right: 45 },
      });

      const writeStream = fs.createWriteStream(PDF_PATH);
      doc.pipe(writeStream);

      // Colors
      const primaryColor = '#1e293b'; // Slate 900
      const accentColor = '#2563eb';  // Blue 600
      const textMuted = '#475569';    // Slate 600
      const bodyColor = '#0f172a';    // Slate 950

      // Header
      doc.font('Helvetica-Bold').fontSize(22).fillColor(primaryColor).text('KARTAVYA GARHWAL', { align: 'center' });
      doc.moveDown(0.2);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(accentColor).text(
        'B.Tech in Computer Science | Aspiring Full-Stack & AI/ML Developer',
        { align: 'center' }
      );
      doc.moveDown(0.2);
      doc.font('Helvetica').fontSize(9).fillColor(textMuted).text(
        'Jaipur, Rajasthan, India | JK Lakshmipat University (2024–2028) | Third Year',
        { align: 'center' }
      );
      doc.font('Helvetica').fontSize(9).fillColor(textMuted).text(
        'Email: [kartavya.contact@example.com] | LinkedIn: [linkedin.com/in/kartavya-garhwal] | GitHub: [github.com/kartavyagarhwal]',
        { align: 'center' }
      );
      doc.moveDown(0.5);

      // Horizontal separator rule
      const drawDivider = () => {
        const y = doc.y;
        doc.strokeColor('#cbd5e1').lineWidth(0.75).moveTo(45, y).lineTo(550, y).stroke();
        doc.moveDown(0.4);
      };

      const sectionTitle = (title) => {
        doc.moveDown(0.4);
        doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text(title.toUpperCase());
        drawDivider();
      };

      // Summary
      sectionTitle('Professional Summary');
      doc.font('Helvetica').fontSize(9.5).fillColor(bodyColor).text(
        'Computer Science Engineering undergraduate at JK Lakshmipat University (JKLU), Jaipur, with strong academic footing and practical experience in MERN stack development, Python systems, Machine Learning, and Cybersecurity. Passionate about building performant web applications, data-driven forecasting models, and Retrieval-Augmented Generation (RAG) architectures.',
        { lineGap: 2.5 }
      );

      // Education
      sectionTitle('Education');
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(bodyColor).text(
        'Bachelor of Technology (B.Tech) in Computer Science',
        { continued: true }
      );
      doc.font('Helvetica').fontSize(9.5).fillColor(textMuted).text(' — 2024 – 2028', { align: 'right' });
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(accentColor).text('JK Lakshmipat University (JKLU), Jaipur, Rajasthan');
      doc.font('Helvetica').fontSize(9).fillColor(bodyColor).text(
        'Current Academic Year: Third Year | Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Full-Stack Web Development, Machine Learning Fundamentals, Computer Networks, Operating Systems.'
      );

      // Technical Skills
      sectionTitle('Technical Skills');
      const addSkillLine = (category, skills) => {
        doc.font('Helvetica-Bold').fontSize(9.5).fillColor(bodyColor).text(`${category}: `, { continued: true });
        doc.font('Helvetica').fontSize(9.5).fillColor(textMuted).text(skills);
        doc.moveDown(0.15);
      };

      addSkillLine('Programming Languages', 'C, Python, JavaScript (ES6+), SQL');
      addSkillLine('Frontend Development', 'React.js, HTML5, CSS3/Modern CSS, Vite, Responsive Web Design');
      addSkillLine('Backend Development', 'Node.js, Express.js, Django, RESTful API Architecture');
      addSkillLine('Databases', 'MongoDB, Mongoose ODM, Relational SQL');
      addSkillLine('Data Science & AI/ML', 'pandas, NumPy, scikit-learn, Retrieval-Augmented Generation (GraphRAG), Anomaly Detection');
      addSkillLine('Tools & DevOps', 'Git, GitHub, npm, VS Code, Postman, Linux Basics');

      // Key Academic Projects
      sectionTitle('Key Academic & Technical Projects');

      const addProject = (title, tech, points) => {
        doc.font('Helvetica-Bold').fontSize(10).fillColor(bodyColor).text(title, { continued: true });
        doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(accentColor).text(`  [${tech}]`);
        points.forEach((pt) => {
          doc.font('Helvetica').fontSize(9).fillColor(bodyColor).text(`•  ${pt}`, {
            indent: 10,
            lineGap: 1.5,
          });
        });
        doc.moveDown(0.25);
      };

      addProject(
        'End-to-End Device Monitoring Solution',
        'Python, Node.js, Express, MongoDB, WebSockets, Cybersecurity',
        [
          'Engineered a centralized cybersecurity monitoring system capturing device metrics, active processes, and network socket traffic.',
          'Implemented anomaly detection heuristics and real-time security event alerts integrated into an intuitive monitoring dashboard.',
          'Secured communication pipelines and logged host security status for operational auditing.',
        ]
      );

      addProject(
        'GraphRAG Knowledge Retrieval System',
        'Python, Knowledge Graphs, Vector Search, LLM RAG, NLP',
        [
          'Designed a hybrid QA system fusing unstructured document retrieval with knowledge-graph entity relationships.',
          'Enabled multi-hop reasoning over complex technical corpora, connecting fragmented facts across multiple documents.',
          'Optimized context synthesis to reduce hallucination and enhance response explainability.',
        ]
      );

      addProject(
        'Air Quality Index (AQI) Analysis & Prediction',
        'Python, pandas, NumPy, scikit-learn, Data Visualization',
        [
          'Constructed an exploratory data pipeline analyzing particulate matter (PM2.5, PM10), CO, and NO2 pollution indicators.',
          'Evaluated correlation matrices and trained baseline regression models to accurately forecast environmental AQI levels.',
        ]
      );

      addProject(
        'Student Academic Recovery Prediction',
        'Python, pandas, scikit-learn, Feature Engineering',
        [
          'Conducted exploratory data analysis on student academic progression patterns and assessment indicators.',
          'Built predictive baseline models identifying early signals for academic intervention and student performance recovery.',
        ]
      );

      // Certifications & Academic Interests
      sectionTitle('Certifications, Achievements & Interests');
      doc.font('Helvetica').fontSize(9).fillColor(bodyColor).text(
        '•  Academic Projects: Actively pursuing practical engineering implementations in full-stack web and intelligent systems.',
        { indent: 10, lineGap: 1.5 }
      );
      doc.font('Helvetica').fontSize(9).fillColor(bodyColor).text(
        '•  Professional Focus: Cybersecurity architectures, scalable backend services, and Retrieval-Augmented Generation workflows.',
        { indent: 10, lineGap: 1.5 }
      );
      doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(textMuted).text(
        '•  [Note: Verified certifications from NPTEL/Coursera/platforms can be added in the centralized portfolio configuration]',
        { indent: 10 }
      );

      doc.end();

      writeStream.on('finish', () => resolve(PDF_PATH));
      writeStream.on('error', (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generates a clean, professional Word (.docx) Resume
 */
const generateDOCX = async () => {
  ensureDirectoryExists();

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children: [
          // Header
          new Paragraph({
            text: 'KARTAVYA GARHWAL',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'B.Tech in Computer Science | Aspiring Full-Stack & AI/ML Developer\n',
                bold: true,
                color: '2563EB',
              }),
              new TextRun({
                text: 'Jaipur, Rajasthan, India | JK Lakshmipat University (2024–2028) | Third Year\n',
                color: '475569',
              }),
              new TextRun({
                text: 'Email: [kartavya.contact@example.com] | LinkedIn: [linkedin.com/in/kartavya-garhwal] | GitHub: [github.com/kartavyagarhwal]',
                color: '475569',
              }),
            ],
            spacing: { after: 200 },
          }),

          // Professional Summary
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: 'Computer Science Engineering undergraduate at JK Lakshmipat University (JKLU), Jaipur, with strong academic footing and practical experience in MERN stack development, Python systems, Machine Learning, and Cybersecurity. Passionate about building performant web applications, data-driven forecasting models, and Retrieval-Augmented Generation (RAG) architectures.',
            spacing: { after: 150 },
          }),

          // Education
          new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Bachelor of Technology (B.Tech) in Computer Science (2024–2028)\n', bold: true }),
              new TextRun({ text: 'JK Lakshmipat University (JKLU), Jaipur, Rajasthan\n', color: '2563EB', bold: true }),
              new TextRun({ text: 'Current Status: Third Year\n' }),
              new TextRun({
                text: 'Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Full-Stack Web Development, Machine Learning Fundamentals, Computer Networks, Operating Systems.',
                italics: true,
              }),
            ],
            spacing: { after: 150 },
          }),

          // Technical Skills
          new Paragraph({
            text: 'TECHNICAL SKILLS',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Programming Languages: ', bold: true }),
              new TextRun('C, Python, JavaScript (ES6+), SQL'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Frontend Development: ', bold: true }),
              new TextRun('React.js, HTML5, CSS3/Modern CSS, Vite, Responsive Web Design'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Backend Development: ', bold: true }),
              new TextRun('Node.js, Express.js, Django, RESTful API Architecture'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Databases: ', bold: true }),
              new TextRun('MongoDB, Mongoose ODM, Relational SQL'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Data Science & AI/ML: ', bold: true }),
              new TextRun('pandas, NumPy, scikit-learn, Retrieval-Augmented Generation (GraphRAG), Anomaly Detection'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Tools & DevOps: ', bold: true }),
              new TextRun('Git, GitHub, npm, VS Code, Postman, Linux Basics'),
            ],
            spacing: { after: 150 },
          }),

          // Academic Projects
          new Paragraph({
            text: 'KEY ACADEMIC & TECHNICAL PROJECTS',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
            spacing: { before: 200, after: 100 },
          }),

          // Project 1
          new Paragraph({
            children: [
              new TextRun({ text: '1. End-to-End Device Monitoring Solution ', bold: true }),
              new TextRun({ text: '[Python, Node.js, Express, MongoDB, Cybersecurity]', italics: true, color: '2563EB' }),
            ],
          }),
          new Paragraph({
            text: '• Engineered a centralized cybersecurity monitoring system capturing device metrics, active processes, and network socket traffic.',
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: '• Implemented anomaly detection heuristics and real-time security event alerts integrated into an intuitive monitoring dashboard.',
            bullet: { level: 0 },
            spacing: { after: 100 },
          }),

          // Project 2
          new Paragraph({
            children: [
              new TextRun({ text: '2. GraphRAG Knowledge Retrieval System ', bold: true }),
              new TextRun({ text: '[Python, Knowledge Graphs, Vector Search, LLM RAG, NLP]', italics: true, color: '2563EB' }),
            ],
          }),
          new Paragraph({
            text: '• Designed a hybrid QA system fusing unstructured document retrieval with knowledge-graph entity relationships.',
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: '• Enabled multi-hop reasoning over complex technical corpora, connecting fragmented facts across multiple documents.',
            bullet: { level: 0 },
            spacing: { after: 100 },
          }),

          // Project 3
          new Paragraph({
            children: [
              new TextRun({ text: '3. Air Quality Index (AQI) Analysis & Prediction ', bold: true }),
              new TextRun({ text: '[Python, pandas, NumPy, scikit-learn, Data Analysis]', italics: true, color: '2563EB' }),
            ],
          }),
          new Paragraph({
            text: '• Constructed an exploratory data pipeline analyzing particulate matter (PM2.5, PM10), CO, and NO2 pollution indicators.',
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: '• Evaluated correlation matrices and trained baseline regression models to accurately forecast environmental AQI levels.',
            bullet: { level: 0 },
            spacing: { after: 100 },
          }),

          // Project 4
          new Paragraph({
            children: [
              new TextRun({ text: '4. Student Academic Recovery Prediction ', bold: true }),
              new TextRun({ text: '[Python, pandas, scikit-learn, Feature Engineering]', italics: true, color: '2563EB' }),
            ],
          }),
          new Paragraph({
            text: '• Conducted exploratory data analysis on student academic progression patterns and assessment indicators.',
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: '• Built predictive baseline models identifying early signals for academic intervention and student performance recovery.',
            bullet: { level: 0 },
            spacing: { after: 150 },
          }),

          // Certifications & Notes
          new Paragraph({
            text: 'CERTIFICATIONS & ACHIEVEMENTS',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '• Academic Projects: Actively pursuing practical engineering implementations in full-stack web and intelligent systems.',
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: '• Professional Focus: Cybersecurity architectures, scalable backend services, and Retrieval-Augmented Generation workflows.',
            bullet: { level: 0 },
          }),
          new Paragraph({
            text: '• [Note: Verified certifications from NPTEL/Coursera/platforms can be added in the centralized portfolio configuration]',
            bullet: { level: 0 },
            italics: true,
            color: '64748B',
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(DOCX_PATH, buffer);
  return DOCX_PATH;
};

const generateBothResumes = async () => {
  console.log('📄 Generating PDF and DOCX resume files...');
  await generatePDF();
  await generateDOCX();
  console.log('✅ Generated PDF:', PDF_PATH);
  console.log('✅ Generated DOCX:', DOCX_PATH);
};

if (require.main === module) {
  generateBothResumes()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Failed to generate resumes:', err);
      process.exit(1);
    });
}

module.exports = {
  generateBothResumes,
  generatePDF,
  generateDOCX,
  PDF_PATH,
  DOCX_PATH,
};
