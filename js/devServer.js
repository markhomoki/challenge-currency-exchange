const path = require('path');
const express = require('express');
const http = require('http');
const webpack = require('webpack');
const config = require('../webpack.config');

const compiler = webpack(config);
const app = express();
const server = http.createServer(app);

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 8080;

app.use(express.static(path.join('css')));
app.use(express.static(path.join('js')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
}));

app.get('*', (req, res) => {
	const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<title>Currency exchange challenge</title>
			<meta charset="UTF-8">
			<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
			<meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=no" />
		</head>
		<body>
			<div id="app"></div>
			<script src="/js/app.bundle.js"></script>
		</body>
		</html>
	`;
	res.send(html);
});

server.listen(port);
server.on('listening', (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
