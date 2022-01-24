const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = (app)=> {
    app.use(
        createProxyMiddleware({
            target:'http://143.248.75.68:80',
            changeOrigin:true
        }) 
    )
}