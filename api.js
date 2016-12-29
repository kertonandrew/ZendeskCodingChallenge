const https = require('https');

let options = {
	protocol: 'https:',
	host: 'kertonandrew.zendesk.com',
	auth: 'kerton.andrew@gmail.com:398wHxebWb3F',
	headers: {
		'Content-Type': 'application/json'
	}
};

exports.tickets = (req, res) => {
	options.path = '/api/v2/tickets.json';

	let request = https.get(options, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);

		let data = '';

		res.on('data', (d) => {
			data += d;
		});

		res.on('end', (s) => {
			res.json = JSON.parse(data);
			console.log(res.json);
		});

	}).on('error', (e) => {
		console.error(e);
	})
};

exports.ticket = (req, res) => {
	options.path = '/api/v2/tickets/96.json';

	let request = https.get(options, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);

		let data = '';

		res.on('data', (d) => {
			data += d;
		});

		res.on('end', (s) => {
			res.json = JSON.parse(data);
			console.log(res.json);
		});

	}).on('error', (e) => {
		console.error(e);
	})
};