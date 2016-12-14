var express = require('express');
var router = express.Router();

/* GET songs listing */
router.get('/', (req, res, next) => {
  res.send(200, 'get all songs');
});

router.get('/:id', (req, res, next) => {
  res.send(200, 'params: ' + req.params.id);
});

module.exports = router;
