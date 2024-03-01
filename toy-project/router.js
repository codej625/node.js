const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');
const userController = require('./controller/user-controller');

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`port: ${port}`);});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.use('/user', userController);