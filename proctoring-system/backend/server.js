const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/assessment', require('./routes/assessmentRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Error handler
app.use(require('./middleware/errorHandler'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});