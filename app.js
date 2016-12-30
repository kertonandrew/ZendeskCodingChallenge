//Module dependencies
const express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	morgan = require('morgan'),
	http = require('http'),
	api = require('./api.js'),
	path = require('path'),
	https = require('https');

let app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 8080);
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

// App Routing
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/scripts', express.static(__dirname + '/client/dist/scripts'));
app.use('/images', express.static(__dirname + '/client/dist/images'));
app.use('/styles', express.static(__dirname + '/client/dist/styles'));
app.use('/views', express.static(__dirname + '/client/dist/views'));
app.use('/favicon.ico', express.static(__dirname));


// JSON API
app.get('/api/tickets', api.tickets);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('*', (req, res, next) => {
	// trigger a 403 error
	let err = new Error('Not allowed!');
	err.status = 404;
	next(err);
});

// Start Server
http.createServer(app).listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});