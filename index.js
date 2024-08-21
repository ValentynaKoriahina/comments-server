const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

const commentRoutes = require('./routes/comment.routes');
app.use('/api', commentRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
