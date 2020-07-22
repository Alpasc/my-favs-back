const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.post('/', (req, res) => {
  try {
    const { prenom, mail, mdp } = req.body;
    if (!prenom || !mail || !mdp) {
      console.log(req.body);
      return res.status(403).send('Veuillez remplir tous les champs !');
    }
    connection.query('INSERT INTO utilisateur SET ?', { prenom, mail, mdp }, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Pb base de données');
      }
      return res.status(201).json({
        id: result.insertId,
        ...req.body,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Il y a eu un petit problème...');
  }
});

module.exports = router;
