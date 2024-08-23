const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Storage setup in Multer
const storage = multer.diskStorage({
  // Download directory
  destination: (req, file, callback) => {
    const uploadPath = path.join('fileStorage', 'commentsUploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  // Valid file extensions
  filename: (req, file, callback) => {
    const allowedMimeTypes = [
      "text/plain",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

    const originalName = file.originalname;
    const mimetype = file.mimetype;
    // Checking a file for a valid extension and assigning a unique name
    if (allowedMimeTypes.includes(mimetype)) {
      const uniqueName = `${Date.now()}_${originalName}`;
      callback(null, uniqueName);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
});

// Create multer instance for the specific folder
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      "text/plain",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"), false);
    }
  }
});

module.exports = { upload };
