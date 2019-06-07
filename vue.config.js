module.exports = {

  publicPath: process.env.NODE_ENV === 'production'
    ? '/nrw19-ue/'
    : '/',

  transpileDependencies: [
    'pdf-lib',
  ],

  chainWebpack: (config) => {
    config
      .module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('uint8array-loader')
      .loader('uint8array-loader')
      .end();
  },
};
