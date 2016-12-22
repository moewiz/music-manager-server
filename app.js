let express = require('express');
let cors = require('cors');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');

let index = require('./routes/index');
let songs = require('./routes/songs');
let playlists = require('./routes/playlists');
let authentication = require('./routes/authentication');

let app = express();
// connect to Mongoose
let config = require('./config');
mongoose.Promise = require('bluebird');
mongoose.connect(config.database);
let db = mongoose.connection;

app.disable('x-powered-by');
// view engine setup
app.set('./views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/** automatically configure CORS response headers */
app.use(cors());
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     // add headers to response and send
//     let headers = {};
//     headers["Access-Control-Allow-Origin"] = "*";
//     headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
//     headers["Access-Control-Allow-Credentials"] = false;
//     headers["Access-Control-Max-Age"] = '86400'; // 24 hours
//     headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
//     res.writeHead(200, headers);
//     res.end();
//   } else {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//     res.header("Access-Control-Allow-Credentials", false); // don't need cookie
//     res.header("Access-Control-Max-Age", 86400);
//     next();
//   }
// });

app.use(logger('dev')); // log to console
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// pass passport for configuration
require('./auth/passport')(passport);

app.use('/', index, authentication);
app.all('/api/*', passport.authenticate('jwt', { session: false }));
app.use('/api/songs', songs);
app.use('/api/playlists', playlists);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
