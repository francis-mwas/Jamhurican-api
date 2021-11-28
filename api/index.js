import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/UserRoutes';
import logger from './server/config/logger.config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// Routes defined here
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res) => {
  return res.status(404).json({
    Message: 'URL DOES NOT EXIST, Please counter check',
  });
});

app
  .listen(port, () => {
    logger.info(`App running on port ${port}`);
  })
  .on('error', (err) => {
    logger.error(`There was an error with the app at port ${port}: `, error);
  });

export default app;
