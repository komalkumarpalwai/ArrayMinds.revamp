import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Array-Minds Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  // Connect Database in background
  connectDB();
});

