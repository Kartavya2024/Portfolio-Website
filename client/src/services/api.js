/**
 * API Service Layer for Kartavya's Portfolio
 * Connects React frontend with Express backend
 */

// If VITE_API_URL is set (e.g. in dev or separate host), use it; otherwise use relative path
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Returns backend URL for PDF resume download
 */
export const getResumePdfUrl = () => {
  return `${API_BASE_URL}/api/resume/pdf`;
};

/**
 * Returns backend URL for DOCX resume download
 */
export const getResumeDocxUrl = () => {
  return `${API_BASE_URL}/api/resume/docx`;
};

/**
 * Checks API and Database operational health
 */
export const checkHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.warn('Backend health check error:', error.message);
    return { status: 'error', message: error.message };
  }
};

/**
 * Submits contact form data to the backend
 * @param {Object} data - { name, email, message, _hp }
 */
export const submitContactMessage = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || `Server responded with status ${res.status}`);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Initiates download for a file from the backend
 */
export const triggerDownload = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
