const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('comments_app', 'comments_app', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных установлено успешно.');
    })
    .catch(err => {
        console.error('Ошибка при подключении к базе данных:', err);
    });

module.exports = sequelize;
