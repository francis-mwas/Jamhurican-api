import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import IsAuth from './server/utils/middlewares/authentication';
import userRoutes from './server/routes/UserRoutes';
import contributionRoutes from './server/routes/ContributionsRoutes';
import logger from './server/config/logger.config';

// docs
import swaggerUi from 'swagger-ui-express';
import api_docs from '../api/server/documentation/api_docs.json';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// Routes defined here
app.use(
  '/api/v1/documentation/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(api_docs)
); // swagger documentation
//allow other clients to hit the server
let allowedClients = ['http://localhost:3000'];
let corsOptions = {
  origin: function (origin, callback) {
    if (allowedClients.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contributions', IsAuth, contributionRoutes);

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
    logger.error(`There was an error with the app at port ${port}: `, err);
  });

export default app;
