const express = require('express');
const router = express.Router();
const Song = require('../models/song');

/* GET songs listing */
router.get('/', (req, res) => {
  Song.getSongs((err, songs) => {
    if (err)
      throw err;

    res.json(songs);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Song.getSongById(id, (err, song) => {
    if (err)
      throw err;

    res.json(song);
  });
});

router.post('/', (req, res) => {
  if (req.body && req.body.name) {
    req.body.artist = req.body.artist || '';
    const song = req.body;

    Song.addSong(song, (err, songAdded) => {
      if (err)
        throw err;

      res.json(songAdded);
    });
  } else
    res.json(400, {success: false, msg: 'Invalid form input.'});
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const song = req.body;

  Song.updateSong(id, song, {}, (err, songUpdated) => {
    if (err)
      throw err;

    res.json(songUpdated);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Song.removeSong(id, (err, song) => {
    if (err)
      throw err;

    res.json(song);
  });
});

router.put('/', (req, res) => {
  const ids = req.body;

  Song.removeMultipleSongs(ids, (err, songs) => {
    if (err)
      throw err;

    res.json(songs);
  });
});

module.exports = router;
