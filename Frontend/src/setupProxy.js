import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.cloudinary.com/v1_1/dlbqzfpoh',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};

export default setupProxy;
