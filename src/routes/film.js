const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.post('/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO film SET ?', formData, (err, results) => {
    // console.log(err);
    if (err) {
      // console.log(err);
      res.status(500).send('Erreur dans l\'insertion d\'un film');
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/', (req, res) => {
  connection.query('SELECT * FROM film', (error, results) => {
    res.status(200).json({
      status: 'success',
      results,
    });
  });
});

module.exports = router;
