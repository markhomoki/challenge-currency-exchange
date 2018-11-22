const path = require('path');

module.exports = {
	mode: 'development',
	optimization: {
		nodeEnv: 'development',
	},
	entry: [
		'babel-polyfill',
		'./js/client',
		'./sass/layout.scss',
	],
	output: {
		path: path.join(__dirname, 'build', 'js'),
		filename: 'app.bundle.js',
		publicPath: '/js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: path.resolve(__dirname, './js/shared'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				include: path.join(__dirname, 'js'),
				use: 'babel-loader',
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000&minetype=application/font-woff',
			},
			{
				test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'file-loader',
			},
			{
				test: /\.scss?/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				include: path.join(__dirname, 'sass'),
			},
		],
	},
};
