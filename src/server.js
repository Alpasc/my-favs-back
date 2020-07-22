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
const connexions = require('./routes/connexion');
const films = require('./routes/film');
const genres = require('./routes/genre');

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
app.use('/connexion', connexions);
app.use('/film', films);
app.use('/genre', genres);

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
