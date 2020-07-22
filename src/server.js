const express = require('express');

const app = express();

const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 4000);

app.use(express.json());
// prettier-ignore
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// import rout files here

const inscriptions = require('./routes/inscription');

// const tableRouter = require('./routes/tableroute');

// add app.use here

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// app.use('/tables, tableRouter);

app.use('/inscription', inscriptions);

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
