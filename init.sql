CREATE DATABASE IF NOT EXISTS comments_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE comments_app;

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    filename TEXT,
    homepage TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    parentId INT,
    CONSTRAINT fk_parentId FOREIGN KEY (parentId) REFERENCES comments(id) ON DELETE CASCADE
);

INSERT INTO comments (id, parentId, username, email, content, createdAt) VALUES
(1, NULL, 'user1', 'user1@example.com', 'Это первый заглавный комментарий', '2024-08-21 00:00:00'),
(2, 1, 'user2', 'user2@example.com', 'Это ответ на первый комментарий', '2024-08-22 00:00:00'),
(3, NULL, 'user5', 'user5@example.com', 'Это второй заглавный комментарий', '2024-08-22 00:00:00'),
(4, 1, 'user4', 'user4@example.com', 'Это еще один ответ на первый комментарий', '2024-08-23 00:00:00'),
(5, 3, 'user3', 'user3@example.com', 'Это ответ на второй комментарий', '2024-08-23 00:00:00'),
(6, NULL, 'user6', 'user6@example.com', 'Это третий заглавный комментарий', '2024-08-23 00:00:00'),
(7, 6, 'user7', 'user7@example.com', 'Это ответ на третий комментарий', '2024-08-24 00:00:00');

CREATE INDEX idx_parentId ON comments (parentId);
