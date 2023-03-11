const path = require('path');
module.exports = {
	mode: 'development',
	entry: './src/script.js',
	devtool: 'source-map',
	output: { filename: 'script.js', path: path.resolve(__dirname, 'public') },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
			},
		],
	},
	devServer: {
		static: path.join(__dirname, 'public'),
		compress: true,
		port: 3000,
	},
};
