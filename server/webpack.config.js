const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
  mode: 'development',
    entry: './index.js',
  target:"node",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    modules: [
            'node_modules'
        ],
    extensions: ["", ".ts", ".tsx", ".js", ".json"],
    },
    plugins: [
        
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve("./public"),
                    to: path.resolve("./dist/public")
                }]
        })
      
  ],
    
  watch: true
};