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
	// set api path to dist
}

// App Routing
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/scripts', express.static(__dirname + '/client/dist/scripts'));
app.use('/images', express.static(__dirname + '/client/dist/images'));
app.use('/styles', express.static(__dirname + '/client/dist/styles'));
app.use('/views', express.static(__dirname + '/client/dist/views'));

// JSON API
app.get('/api/ticket', api.ticket);
app.get('/api/tickets', api.tickets);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

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