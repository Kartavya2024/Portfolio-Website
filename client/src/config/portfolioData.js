/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION — KARTAVYA GARHWAL
 * ==============================================================================
 * Centralized, editable configuration file for personal details, academic history,
 * technical skills, projects, certifications, and links.
 *
 * Missing or unverified URLs/credentials are marked with clear placeholders so
 * you can update them at any time before final submission.
 */

export const personalInfo = {
  name: 'Kartavya Garhwal',
  role: 'Computer Science Engineering Student',
  rolesToRotate: [
    'Computer Science Student',
    'Full-Stack MERN Developer',
    'AI & Machine Learning Enthusiast',
    'Cybersecurity Researcher',
    'RAG Systems Builder',
  ],
  institution: 'JK Lakshmipat University (JKLU)',
  institutionFull: 'JK Lakshmipat University, Jaipur, Rajasthan, India',
  degree: 'Bachelor of Technology in Computer Science',
  programDuration: '2024–2028',
  currentYear: 'Third Year',
  location: 'Jaipur, Rajasthan, India',
  email: 'kartavya.contact@example.com', // Placeholder: Update with your primary email
  phone: '+91-XXXXXXXXXX', // Placeholder: Optional phone contact
  socialLinks: {
    github: 'https://github.com/Kartavya2024', // Placeholder: Update with your GitHub profile URL
    linkedin: 'https://www.linkedin.com/in/kartavya-garhwal-developer?utm_source=share_via&utm_content=profile&utm_medium=member_android', // Placeholder: Update with your LinkedIn profile URL
    twitter: '', // Optional
  },
  bio: `I am a third-year Computer Science Engineering student at JK Lakshmipat University (JKLU) in Jaipur, India. My passion lies in engineering robust full-stack software systems and exploring the intersection of modern Artificial Intelligence, Machine Learning, Cybersecurity, and Retrieval-Augmented Generation (RAG).

With a solid grounding in Computer Science fundamentals, data structures, and database architectures, I focus on building resilient software that solves real-world challenges — from real-time endpoint security monitoring to contextual graph-based knowledge retrieval.`,
  shortBio:
    'Third-year B.Tech CS undergraduate at JK Lakshmipat University, specializing in full-stack MERN engineering, intelligent AI/ML systems, and cybersecurity monitoring solutions.',
};

export const stats = [
  { label: 'Academic Standing', value: '3rd Year' },
  { label: 'Degree Duration', value: '2024–2028' },
  { label: 'Technical Projects', value: '4+ Core' },
  { label: 'Specialized Domains', value: '5 Focus Areas' },
];

/**
 * Technical Skills organized by category
 * Proficiency values (0-100) are editable indicators of academic and project comfort.
 */
export const skillsCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern, responsive, accessible web user interfaces',
    skills: [
      { name: 'React.js', proficiency: 85, level: 'Proficient' },
      { name: 'JavaScript (ES6+)', proficiency: 88, level: 'Proficient' },
      { name: 'HTML5 & CSS3', proficiency: 90, level: 'Advanced' },
      { name: 'Responsive Web Design', proficiency: 88, level: 'Proficient' },
      { name: 'Vite & Modern Tooling', proficiency: 82, level: 'Proficient' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Server architecture, RESTful APIs, and secure micro-services',
    skills: [
      { name: 'Node.js', proficiency: 85, level: 'Proficient' },
      { name: 'Express.js', proficiency: 86, level: 'Proficient' },
      { name: 'REST API Architecture', proficiency: 88, level: 'Proficient' },
      { name: 'Django', proficiency: 75, level: 'Intermediate' },
      { name: 'Authentication & Security', proficiency: 78, level: 'Intermediate' },
    ],
  },
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Core languages for systems, algorithms, and computational logic',
    skills: [
      { name: 'Python', proficiency: 90, level: 'Advanced' },
      { name: 'C', proficiency: 80, level: 'Intermediate' },
      { name: 'JavaScript', proficiency: 88, level: 'Proficient' },
      { name: 'SQL', proficiency: 84, level: 'Proficient' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational and document storage solutions',
    skills: [
      { name: 'MongoDB', proficiency: 85, level: 'Proficient' },
      { name: 'Mongoose ODM', proficiency: 84, level: 'Proficient' },
      { name: 'Relational SQL / DBMS', proficiency: 80, level: 'Intermediate' },
      { name: 'Data Modeling & Indexing', proficiency: 78, level: 'Intermediate' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science and AI/ML',
    description: 'Intelligent inference, data mining, and neural retrieval pipelines',
    skills: [
      { name: 'pandas', proficiency: 85, level: 'Proficient' },
      { name: 'NumPy', proficiency: 86, level: 'Proficient' },
      { name: 'scikit-learn', proficiency: 80, level: 'Intermediate' },
      { name: 'GraphRAG & RAG Concepts', proficiency: 78, level: 'Intermediate' },
      { name: 'Anomaly Detection', proficiency: 76, level: 'Intermediate' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools and Technologies',
    description: 'Engineering workflows, version control, and collaboration',
    skills: [
      { name: 'Git & Version Control', proficiency: 88, level: 'Proficient' },
      { name: 'GitHub', proficiency: 88, level: 'Proficient' },
      { name: 'npm & Package Management', proficiency: 85, level: 'Proficient' },
      { name: 'Postman (API Testing)', proficiency: 84, level: 'Proficient' },
      { name: 'Linux Command Line', proficiency: 78, level: 'Intermediate' },
    ],
  },
];

/**
 * Projects Showcase
 * Uses real academic concepts specified in your course profile.
 * Placeholders are explicitly indicated where live demo or repo URLs are pending.
 */
export const projectsData = [
  {
    id: 'device-monitoring',
    title: 'End-to-End Device Monitoring Solution',
    subtitle: 'Cybersecurity Endpoint Telemetry & Anomaly Detection',
    category: 'Cybersecurity & Systems',
    description:
      'A cybersecurity monitoring system engineered to capture real-time device telemetry, active system processes, and network socket activity. Features anomaly detection heuristics to identify abnormal behavior and an administrative dashboard for event auditing.',
    technologies: ['Python', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'Network Sockets'],
    featured: true,
    highlights: [
      'Monitors host metrics, running processes, and active network connections in real-time',
      'Anomaly detection rules flag potential malicious activity and unauthorized connections',
      'Centralized event logging stored in MongoDB for security audits',
    ],
    githubUrl: null, // Placeholder: Set to your GitHub repo (e.g., 'https://github.com/kartavyagarhwal/device-monitoring')
    liveUrl: null, // Placeholder: Set if hosted live
    isPlaceholderUrl: true,
    badge: 'Cybersecurity & Telemetry',
  },
  {
    id: 'graphrag-system',
    title: 'GraphRAG Knowledge Retrieval System',
    subtitle: 'Graph-Augmented Question-Answering Architecture',
    category: 'AI / ML & RAG',
    description:
      'An advanced question-answering architecture that bridges traditional unstructured vector search with structured knowledge-graph entity relationships. Enables multi-hop reasoning across fragmented technical documents with explainable context trails.',
    technologies: ['Python', 'Knowledge Graphs', 'Vector Embeddings', 'RAG', 'NLP'],
    featured: true,
    highlights: [
      'Extracts entity-relation tuples to model complex interconnected knowledge',
      'Supports multi-hop question answering across non-contiguous documents',
      'Substantially mitigates retrieval hallucination compared to flat vector search',
    ],
    githubUrl: null, // Placeholder: Set to your GitHub repo
    liveUrl: null,
    isPlaceholderUrl: true,
    badge: 'AI & Knowledge Graph',
  },
  {
    id: 'aqi-analysis',
    title: 'Air Quality Index (AQI) Analysis & Prediction',
    subtitle: 'Environmental Pollution Analytics & Forecasting',
    category: 'Data Science & ML',
    description:
      'An exploratory data analysis and predictive modeling pipeline evaluating air pollution indicators (PM2.5, PM10, CO, NO2). Implemented data preprocessing, correlation heatmaps, and regression-based machine learning models to forecast AQI levels.',
    technologies: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'Seaborn'],
    featured: false,
    highlights: [
      'Cleansed, imputed, and normalized multi-parameter environmental pollution time-series',
      'Evaluated pollutant correlations with meteorological indicators',
      'Trained regression models for baseline AQI predictive forecasting',
    ],
    githubUrl: null, // Placeholder: Set to your GitHub repo
    liveUrl: null,
    isPlaceholderUrl: true,
    badge: 'Data Analytics & ML',
  },
  {
    id: 'academic-recovery',
    title: 'Student Academic Recovery Prediction',
    subtitle: 'Educational Data Mining & Early Warning Modeling',
    category: 'Data Science & ML',
    description:
      'An educational data mining project investigating student academic progression patterns. Utilized feature engineering and baseline machine learning classifiers to detect early distress signals, enabling timely academic recovery interventions.',
    technologies: ['Python', 'pandas', 'scikit-learn', 'Statistical Analysis', 'Jupyter'],
    featured: false,
    highlights: [
      'Engineered behavioral and assessment feature vectors from academic datasets',
      'Identified critical threshold features correlated with performance decline',
      'Established baseline classifiers to prioritize student advisory intervention',
    ],
    githubUrl: null, // Placeholder: Set to your GitHub repo
    liveUrl: null,
    isPlaceholderUrl: true,
    badge: 'Predictive Modeling',
  },
];

/**
 * Education and Experience Timeline
 */
export const timelineData = [
  {
    id: 'btech-cs',
    title: 'B.Tech in Computer Science',
    organization: 'JK Lakshmipat University (JKLU), Jaipur',
    duration: '2024 – 2028',
    status: 'In Progress (Third Year)',
    description:
      'Pursuing Bachelor of Technology with academic coursework in Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Full-Stack Engineering.',
    type: 'education',
    tags: ['Core CS', 'MERN Stack', 'Algorithms', 'Databases'],
  },
  {
    id: 'systems-projects',
    title: 'Cybersecurity Telemetry & Full-Stack Systems',
    organization: 'Academic Capstone & Laboratory Work',
    duration: '2025 – Present',
    status: 'Active',
    description:
      'Developing the End-to-End Device Monitoring platform, focusing on socket communication, security anomaly detection, and Express/MongoDB backend persistence.',
    type: 'academic',
    tags: ['Cybersecurity', 'Node.js', 'Telemetry', 'MongoDB'],
  },
  {
    id: 'ai-rag-research',
    title: 'Intelligent Knowledge Retrieval & GraphRAG',
    organization: 'Academic Project & Applied AI Research',
    duration: '2025 – Present',
    status: 'Active',
    description:
      'Formulating hybrid document retrieval pipelines combining semantic embeddings with entity relationship graphs for explainable AI reasoning.',
    type: 'academic',
    tags: ['GraphRAG', 'Python', 'NLP', 'Knowledge Graphs'],
  },
  {
    id: 'data-analytics',
    title: 'Predictive Modeling & Environmental Analytics',
    organization: 'Data Science Coursework',
    duration: '2024 – 2025',
    status: 'Completed',
    description:
      'Implemented exploratory data pipelines and regression models for Air Quality Index prediction and student academic recovery forecasting.',
    type: 'academic',
    tags: ['pandas', 'scikit-learn', 'Data Mining', 'AQI'],
  },
];

/**
 * Certifications and Academic Achievements
 * Verified entries can be updated here by adding certificate links/IDs.
 */
export const certificationsData = [
  {
    id: 'cert-fullstack',
    title: 'Full Stack Application Development (CS1237)',
    issuer: 'JK Lakshmipat University',
    issueDate: '2026',
    credentialUrl: null, // Placeholder: Add URL if verifiable online
    isVerified: true,
    type: 'Coursework',
    description: 'Comprehensive study of MERN stack architectures, RESTful APIs, and cloud deployments.',
  },
  {
    id: 'cert-python-ai',
    title: 'Python for Data Science & Machine Learning',
    issuer: 'Platform / Coursework Placeholder',
    issueDate: 'Academic Milestone',
    credentialUrl: null, // Placeholder: Insert Coursera / NPTEL link here
    isVerified: false,
    type: 'Certification Placeholder',
    description: 'Editable slot for upcoming verified certifications in Python, pandas, and scikit-learn.',
  },
  {
    id: 'cert-cybersec',
    title: 'Network Security & Endpoint Monitoring',
    issuer: 'Laboratory Project Milestone',
    issueDate: 'Academic Milestone',
    credentialUrl: null, // Placeholder: Insert verification link or hackathon participation certificate
    isVerified: false,
    type: 'Milestone Placeholder',
    description: 'Practical implementation of endpoint telemetry, socket sniffing, and anomaly detection.',
  },
];
