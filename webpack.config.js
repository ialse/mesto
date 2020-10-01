const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: { main: './src/index.js' },
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
	},
	module: {
		rules: [
			{
			  test: /\.js$/,
			  loader: 'babel-loader',
			  exclude: '/node_modules/'
			},
			// добавили правило для обработки файлов
			{
			  // регулярное выражение, которое ищет все файлы с такими расширениями
			  test: /\.(png|svg|jpg|JPG|gif|woff2)$/,
			  // при обработке этих файлов нужно использовать file-loader
			  loader: 'file-loader'
			},
			// аналогично добавьте правило для работы с html
			{
			  test: /\.html$/,
			  loader: 'html-loader',
			},
		  ]
	  },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html' // путь к файлу index.html
		  })
	]
};