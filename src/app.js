require('./utils/requestHandlers/responseHandler');

const express = require('express');
const cors = require('cors');
const { APP_PORT } = require('config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require('./routes')(app);

const port = process.env.APP_PORT || APP_PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port} in ${process.env.NODE_ENV} environment`);
});

module.exports = app;
