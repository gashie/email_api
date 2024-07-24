const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//call routes files


const email = require('./routes/email');
const addinstitutionemail = require('./routes/addinstitutionemail');

//load env vars
dotenv.config({ path: './config/config.env' });
//initialise express
const app = express();

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//cors




if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Mount routes


// app.use('/api/v1/email', email);
app.use('/api/v1/welcome', addinstitutionemail);
//errror middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//create port
const PORT = process.env.PORT || 5000;
//listen to portnpm
app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode and listening on port http://localhost:${PORT}`
  );
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
