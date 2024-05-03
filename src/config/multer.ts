import multer from 'multer';

// Set up Multer storage
const storage = multer.diskStorage({});

// Set up Multer instance
export const upload = multer({ storage });
