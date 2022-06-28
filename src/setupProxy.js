const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/auth', {
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/profiles', {
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/users', {
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/onboard', {
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );
};
