const path = require('path');
module.exports = {
	mode: 'development',
	entry: './src/script.js',
	devtool: 'source-map',
	output: { filename: 'script.js', path: path.resolve(__dirname, 'public') },
	// A comment for me in the future: if using "npx webpack-dev-derver", then the bundle will be existing in the memory. Only using "npx webpack" can see the bundle in the file system
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
		port: 8000,
	},
};
