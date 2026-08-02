const getLanHost = () =>
  typeof window !== 'undefined' ? window.location.hostname : 'localhost';

const API_URL =
  import.meta.env.VITE_API_URL || `http://${getLanHost()}:5000/api`;
const UPLOAD_URL =
  import.meta.env.VITE_UPLOAD_URL || `http://${getLanHost()}:5000`;

export const getImageSrc = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${UPLOAD_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export { API_URL, UPLOAD_URL };
