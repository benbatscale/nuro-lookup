const connect     = require('connect');
const serveStatic = require('serve-static');
const nuro        = require('nuro-script');
const test        = require('test');

connect().use(serveStatic(__dirname)).listen(8080, () => console.log('Server running on 8080...'));

connect().use('/test', function(req, res, next) {
    console.log(req, res);
    res.send('test');
});