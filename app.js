var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var WS = require('./server/ws/ws');
var DataProvider = require('./server/data/data');

var routes = require('./routes/index');

var app = express();

var ws = new WS();
ws.on('ADD_NOTE', function(data) {
    dataProvider.addNote({
        coord: data.data.latLng,
        message: data.data.message
    });
});
ws.on('GET_CURRENT_NOTES', function(data) {
    var notes = dataProvider.getNotes();
    ws.send({
        type: 'NOTES',
        data: {
            notes: notes
        }
    }, data.ws);
});

var dataProvider = new DataProvider();
dataProvider.on('notes:change', function(notes) {
   ws.broadcast({
       type: 'NOTES_CHANGE',
       data: {
           notes: notes
       }
   });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon2.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
