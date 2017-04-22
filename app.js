const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const index = require('./routes/index');
const songs = require('./routes/songs');
const playlists = require('./routes/playlists');
const authentication = require('./routes/authentication');

require('serve-favicon');

const app = express();
// connect to Mongoose
const config = require('./config');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database);

app.disable('x-powered-by');
// view engine setup
app.set('./views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/** automatically configure CORS response headers */
app.use(cors());

app.use(logger('dev')); // log to console
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// pass passport for configuration
require('./auth/passport')(passport);

app.use('/', index, authentication);
app.all('/api/*', passport.authenticate('jwt', {session: false}));
app.use('/api/songs', songs);
app.use('/api/playlists', playlists);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
