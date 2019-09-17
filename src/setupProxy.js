const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/apis', { 
    target: 'http://api.budejie.com',
    changeOrigin:true,
    pathRewrite: {
              "^/apis": ""
          }
    }))
}