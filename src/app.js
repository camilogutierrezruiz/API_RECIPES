//* Dependencies
const express = require('express');
const db = require('./utils/database');

//* Files
const { port } = require('./config');
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');

//* Initial Configs
const app = express();

app.use(express.json());

//* Database setting
//todo => Authentication
db.authenticate()
  .then(() => {
    console.log('Database authenticated');
  })
  .catch((err) => {
    console.log(err);
  });

//todo => Synchronization
db.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.log(err);
  });

//* Define API prefix
const prefix = '/api/v1/users';
const authPrefix = '/api/v1/auth';

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK!',
    users: `localhost:${port}/api/v1/users`
  });
});

app.use(prefix, userRouter);
app.use(authPrefix, authRouter)


app.listen(port, () => {
  console.log(`Server started ar port ${port}`);
});