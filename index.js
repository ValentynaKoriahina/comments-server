const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


app.use(express.static('client'));

const commentRoutes = require('./routes/comment.routes');
app.use('/api', commentRoutes);
const fileRoutes = require('./routes/file.routes');
app.use('/api', fileRoutes);
const validationRoutes = require('./routes/validation.routes');
app.use('/api', validationRoutes);
const securityRoutes = require('./routes/security.routes');
app.use('/api', securityRoutes);

// Подключение обработчиков событий по сокетам
const SocketManager = require('./services/SocketManager');
new SocketManager(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
