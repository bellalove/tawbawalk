var common = require('koa-common');
var koa = require('koa');

var app = koa();

app.use(common.logger());
app.use(common.responseTime());
app.use(common.favicon());
app.use(common.static(__dirname));

app.listen(8000);
console.log('listening on port 8000');
