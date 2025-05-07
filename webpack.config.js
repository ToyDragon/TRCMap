const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = ["test"];

module.exports = []

for (const page of pages) {
  module.exports.push({
    "entry": `./src/${page}.tsx`,
    "mode": "production",
    "output": {
        path: path.resolve(__dirname, "docs"),
        filename: `${page}.js`
    },
    "resolve": {
      "extensions": ['.js', '.jsx', '.tsx', '.ts', '.html', '.scss'],
      modules: ['node_modules'],
    },
    "module": {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    "plugins": [
        new HtmlWebpackPlugin({ template: `./src/${page}.html`, filename: `${page}.html` })
    ],
    "devtool": "inline-source-map"
  });
}