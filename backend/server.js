//package imports
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import colors from 'colors';
//app imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

//Bring in global variables
dotenv.config();

//Initialise express
const app = express();

//Connect to database
connectDB();

//Turn on morgan if in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('short'));
}

//Mount middleware packages
app.use(express.json());
app.use(helmet());
app.use(cors());

//Connect to PORT set in global environment, or else 5000
const PORT = process.env.PORT || 5000;

//Mount routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/upload', uploadRoutes);

//Getting access to uploads folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Errors & Error middleware
app.use(notFound);
app.use(errorHandler);

//Log server status
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);
