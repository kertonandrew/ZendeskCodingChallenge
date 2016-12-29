//Module dependencies
let express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	morgan = require('morgan'),
	api = require('./api.js'),
	http = require('http'),
	path = require('path');

let app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

let env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
	app.use(errorHandler());
}

// production only
if (env === 'production') {
	// TODO
}

// JSON API
app.get('/api/ticket', api.ticket);
app.get('/api/tickets', api.tickets);

app.get('/', index);

app.get('*', (req, res, next) => {
	// trigger a 403 error
	let err = new Error('Not allowed!');
	err.status = 403;
	next(err);
});

// Start Server

http.createServer(app).listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});