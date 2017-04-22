const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

/* GET playlists listing */
router.get('/', (req, res) => {
  Playlist.getPlaylists((err, playlists) => {
    if (err)
      throw err;
    res.json(playlists);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Playlist.getPlaylistById(id, (err, playlist) => {
    if (err)
      throw err;
    res.json(playlist);
  });
});

router.get('/:id/songs', (req, res) => {
  const id = req.params.id;

  Playlist.getSongs(id, (err, songs) => {
    if (err)
      throw err;
    res.json(songs);
  });
});

module.exports = router;
