const multer = require("multer");
const fs = require('fs');
const path = require('path');

/**
 * Назначение: для обработки загрузки файлов с использованием библиотеки Multer.
 * Он настраивает хранилище для загружаемых файлов, проверяет допустимые MIME-типы, 
 * и обеспечивает сохранение файлов с уникальными именами в определенной директории.
 * 
 */

// Настройка хранилища в Multer
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
    const uploadPath = path.join('fileStorage', 'commentsUploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  // Проверка и задание имени файла с учетом допустимых расширений
  filename: (req, file, callback) => {
    const allowedMimeTypes = [
      "text/plain",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

    const originalName = file.originalname;
    const mimetype = file.mimetype;
    // Проверка MIME-типа файла и присвоение уникального имени
    if (allowedMimeTypes.includes(mimetype)) {
      const uniqueName = `${Date.now()}_${originalName}`;
      callback(null, uniqueName);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      "text/plain",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

    // Проверка типа файла с использованием фильтра
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"), false);
    }
  }
});

module.exports = { upload };
