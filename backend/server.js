const express = require('express');

const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoute');
const messengerRoute = require('./routes/messengerRoute');

dotenv.config({
  path: 'backend/config/config.env',
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/messenger', messengerRoute);

app.get('/', (req, res) => {
  res.send('Connect to server run');
});

databaseConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
