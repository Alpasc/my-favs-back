const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.post('/user', (req, res) => {
  try {
    const { mail, mdp } = req.body;
    connection.query('SELECT * FROM utilisateur WHERE mail = ?', { mail }, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Petit probleme...');
      } return res.sendStatus(200);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Il y a eu un petit problème...');
  }
});

module.exports = router;
