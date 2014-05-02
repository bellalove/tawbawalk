
var config = require('./config');

var koa = require('koa');
var app = module.exports = koa();

// rudimentary logging and other common stuff
var common = require('koa-common');
app.use(common.logger());
app.use(common.responseTime());

// livereload - only from gulp
if (Boolean(process.env.LIVERELOAD)) {
  var livereload = require('koa-livereload');
  app.use(livereload());
}

// client-side stuff
app.use(common.static(config.clientd));

// basic service route handler
var route = require('koa-route');
var _ = require('lodash');
app.use(route.get('/myroute', myroute));
function *myroute() { this.body = "My Route " + _.now(); }

// basic post with a view
var parse = require('co-body');
var views = require('co-views');
var render = views(config.serverd + '/views', {ext: 'jade'});
app.use(route.post('/post', function *() {
  var locals = yield parse(this, { limit: '1kb' });
  this.body = yield render ('post', locals);
}));

// great things happen to those that ...
app.listen(config.port);
console.log('listening on *:' + config.port);
