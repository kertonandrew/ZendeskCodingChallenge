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

exports.ticket = (req, res) => {
	options.path = '/api/v2/tickets.json';
	https.get(options, (res) => {

		const statusCode = res.statusCode;
		const contentType = res.headers['content-type'];

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
			res.resume();
			return;
		}

		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => rawData += chunk);
		res.on('end', () => {
			try {
				let parsedData = JSON.parse(rawData);
				console.log(parsedData);
			} catch (e) {
				console.log(e.message);
			}
		});
	}).on('error', (e) => {
		console.log(`Got error: ${e.message}`);
	});
};

exports.tickets = (req, res) => {
	options.path = '/api/v2/tickets/96.json';
	let request = https.request(options, (res) => {

		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
		});
		res.on('end', () => {
			console.log('No more data in response.');
		});
	});

	request.on('error', (e) => {
		console.log(`problem with request: ${e.message}`);
	});

	// write data to request body
	request.write(postData);
	request.end();
};