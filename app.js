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

let options = {
	protocol: 'https:',
	host: 'kertonandrew.zendesk.com',
	auth: 'kerton.andrew@gmail.com:398wHxebWb3F',
	headers: {
		'Content-Type': 'application/json'
	}
};

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
app.get('/api/tickets', (req, res) => {
	options.path = '/api/v2/tickets.json';
	https.get(options, (result) => {

		const statusCode = result.statusCode;
		const contentType = result.headers['content-type'];

		let error;
		if (statusCode !== 200) {
			error = new Error(`Request Failed.\n` +
				`Status Code: ${statusCode}`);
		} else if (!/^application\/json/.test(contentType)) {
			error = new Error(`Invalid content-type.\n` +
				`Expected application/json but received ${contentType}`);
		}
		if (error) {
			console.log(error.message);
			// consume response data to free up memory
			result.resume();
			return;
		}

		result.setEncoding('utf8');
		let rawData = '';
		result.on('data', (chunk) => rawData += chunk);
		result.on('end', () => {
			try {
				let parsedData = JSON.parse(rawData);
				console.log(parsedData);
				res.send(parsedData);
			} catch (e) {
				console.log(e.message);
			}
		});
	}).on('error', (e) => {
		console.log(`Got error: ${e.message}`);
	});
});

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