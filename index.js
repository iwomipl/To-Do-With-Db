const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const rateLimit = require('express-rate-limit');
const { homeRouter } = require('./routers/home');
const { handleError } = require('./utils/errors');

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 25,
  message: '<h2>Sorry, You\'ve reached requests limit.</h2><br><h1>Wait for a minute, and try again.</h1>',
});
app.use(limiter);
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', hbs({
  extname: '.hbs',
  // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
// app.use('/client', clientRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});
