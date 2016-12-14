var express = require('express');
var router = express.Router();

/* GET playlists listing */
router.get('/', (req, res, next) => {
  res.send(200, 'get all playlists');
});

router.get('/:id', (req, res, next) => {
  res.send(200, 'params: ' + req.params.id);
});

module.exports = router;
