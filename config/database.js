/**
 * Модуль для настройки и инициализации подключения к базе данных с использованием Sequelize.
 * 
 * Использует переменные окружения для задания параметров подключения,
 * таких как имя базы данных, пользователь, пароль, хост и другие.
 */
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'comments_app',
    process.env.DB_USER || 'comments_app',
    process.env.DB_PASSWORD || '123456',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: process.env.DB_LOGGING === 'true' ? console.log : false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных установлено успешно.');
    })
    .catch(err => {
        console.error('Ошибка при подключении к базе данных:', err);
    });

module.exports = sequelize;
