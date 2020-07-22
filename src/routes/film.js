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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM film WHERE id = ?';
  connection.query(query, id, (error, results) => {
    try {
      if (results.length === 0) {
        res.status(404).json({
          status: 'error',
          errorMessage: 'Film non trouvé',
        });
      } else {
        res.status(200).json({
          status: 'success',
          results: results[0],
        });
      }
    } catch (err) {
      res.status(500).send('Notre serveur ne peut pas répondre à votre requête');
    }
  });
});

router.put('/:id', (req, res) => {
  const { body: formData } = req;
  const idFilm = req.params.id;
  try {
    const query = 'UPDATE film SET ? WHERE id = ?';
    connection.query(query, [formData, idFilm], (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          error: 'error',
          sql: 'Impossible de répondre à votre requête',
        });
      } else {
        connection.query('SELECT * FROM film WHERE id = ?', idFilm, (err, user) => {
          if (err) {
            res.status(404);
          } else {
            res.status(200).json(user[0]);
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Notre serveur ne peut pas répondre à votre requête',
    });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM film WHERE id = ?';
  connection.query(query, id, (error, results) => {
    try {
      if (!id) {
        res.status(404).json({
          status: 'error',
          errorMessage: 'Film non trouvé',
        });
      } else {
        res.status(201).json({
          status: 'success',
          filmDeleted: id,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'error',
        errorMessage: 'Notre serveur ne peut pas répondre à votre requête',
      });
    }
  });
});

module.exports = router;
