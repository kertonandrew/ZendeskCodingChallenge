const https = require('https');
const request = require('request');

let options = {
	protocol: 'https:',
	host: 'kertonandrew.zendesk.com',
	auth: 'kerton.andrew@gmail.com:398wHxebWb3F',
	headers: {
		'Content-Type': 'application/json'
	}
};

let request = (path) => {
	options.path = path;
	https.get(options, (result) => {
		const statusCode = result.statusCode;
		const contentType = result.headers['content-type'];

		let error = '';
		if (statusCode !== 200) {
			error = new Error('Request Failed.\n' +
				'Status Code: ' + statusCode);
		} else if (!/^application\/json/.test(contentType)) {
			error = new Error('Invalid content-type.\n' +
				'Expected application/json but received ' + contentType);
		}

		if (error != '') {
			console.log(error.message);
			// consume response data to free up memory
			result.resume();
			res.statusCode = statusCode;
			res.send(error);
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
		console.log('Got error: ', e.message);
	});
}

exports.tickets = (req, res) => {
	options.path = '/api/v2/tickets.json';
};

exports.ticket = (req, res) => {
	options.path = '/api/v2/tickets/96.json';
};