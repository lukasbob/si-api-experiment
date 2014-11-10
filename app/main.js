'use strict';

const koa = require('koa');
const router = require('koa-router');
const serve = require('koa-static');
const handlebars = require('koa-handlebars');
const siapi = require('./lib/siapi');
const renderer = require('./lib/renderer');

var app = koa();

app.use(serve(__dirname + '/public'));

// Set up view engine
app.use(handlebars({
	root: __dirname,
	defaultLayout: 'main',
	cache: app.env !== 'development'
}));

// Set up routing
app.use(router(app));

// All requests to /api/* are passed through a pipeline of handlers.
app.get(/^\/api(\/.*)$/i, siapi, renderer);

app.listen(3000);

console.log('Running on port 3000...');