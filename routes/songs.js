let express = require('express');
let router = express.Router();

Song = require('../models/song');

/* GET songs listing */
router.get('/', (req, res) => {
  Song.getSongs((err, songs) => {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Song.getSongById(id, (err, song) => {
    if (err) {
      throw err;
    }
    res.json(song);
  });
});

router.post('/', (req, res) => {
  if (req.body && req.body.name) {
    req.body.artist = req.body.artist || '';
    let song = req.body;
    Song.addSong(song, (err, song) => {
      if (err) {
        throw err;
      }
      res.json(song);
    });
  } else {
    res.json(400, { success: false, msg: 'Invalid form input.' });
  }
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

router.put('/', (req, res) => {
  let ids = req.body;
  Song.removeMultipleSongs(ids, (err, songs) => {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

module.exports = router;
