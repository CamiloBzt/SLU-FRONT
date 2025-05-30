const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'node_modules'),
        'C:\\DumpStack.log.tmp'
      ]
    }
  },
  devServer: {
    compress: true,
    inline: true,
    port: 8080,
    allowedHosts: [
      '.amazonaws.com',
      'dev2.slunderwriters.com'
    ]
  }
};
