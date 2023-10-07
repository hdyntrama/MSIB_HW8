const express = require('express');
const router = express.Router();
const pool = require('./queries.js');

//show all list film from table dvdrental
router.get('/', (req, res) => {
  pool.query('SELECT * FROM public.film', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

//show data film based on id
router.get('/film/id/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM public.film WHERE film_id = $1', [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'id not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  });
});

//show all list category
router.get('/category', (req, res) => {
  pool.query('SELECT * FROM public.category', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

//show data list film based on category
router.get('/film/category/:categoryid', (req, res) => {
  const categoryid = req.params.categoryid;
  pool.query('SELECT film.*FROM film JOIN film_category ON film.film_id = film_category.film_id WHERE film_category.category_id = $1', [categoryid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Kategori tidak ditemukan' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  });
});

module.exports = router;