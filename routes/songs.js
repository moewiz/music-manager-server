let express = require('express');
let router = express.Router();

Song = require('../models/song');

/* GET songs listing */
router.get('/', (req, res, next) => {
  Song.getSongs((err, songs) => {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Song.getSongById(id, (err, song) => {
    if (err) {
      throw err;
    }
    res.json(song);
  });
});

router.post('/', (req, res) => {
  let song = req.body;
  Song.addSong(song, (err, song) => {
    if (err) {
      throw err;
    }
    res.json(song);
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let song = req.body;
  Song.updateSong(id, song, {}, (err, song) => {
    if (err) {
      throw err;
    }
    res.json(song);
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Song.removeSong(id, (err, song) => {
    if (err) {
      throw err;
    }
    res.json(song);
  });
});

module.exports = router;
