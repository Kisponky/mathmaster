require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors({ origin: '*' }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');


app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', messageRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auditLog', auditLogRoutes);


app.get('/', (req, res) => {
  res.send('<h1>Szerver fut</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Példa alkalmazás publikálva ${process.env.PORT}-en`);
});

module.exports = app;