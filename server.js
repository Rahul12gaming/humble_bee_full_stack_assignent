import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig.js';
import  HiveRouter  from './routes/hiveRoutes.js';
import  CropRouter  from './routes/cropRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app=express();
const PORT=5001;

dotenv.config();

app.use(express.json());
app.use('/hives', HiveRouter);
app.use('/crops', CropRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error', err);
});
