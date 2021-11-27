import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.get('*', (req, res) =>
  res.status(404).send({
    message: 'URL does not exist, please try again',
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
