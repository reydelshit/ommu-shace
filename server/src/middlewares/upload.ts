import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Ensure the upload folder exists
const ensureDirectory = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage with separate folders
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = path.join(__dirname, '../uploads'); // Default folder

    if (file.fieldname === 'profilePicture') {
      folder = path.join(__dirname, '../uploads/profile');
    } else if (file.fieldname === 'coverPicture') {
      folder = path.join(__dirname, '../uploads/cover');
    }

    ensureDirectory(folder); // Ensure folder exists before saving

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter (optional)
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
