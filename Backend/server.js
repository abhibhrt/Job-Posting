const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("Welcome to HR-ZONE");
});

app.use('/auth', require('./routes/auth'));
app.use('/jobs', require('./routes/jobs'));
app.use('/candidates', require('./routes/candidates'));
app.use('/reviews', require('./routes/reviews'));
app.use('/updates', require('./routes/updates'));
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => console.log(`Server running on port 5000`));
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
