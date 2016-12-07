const handlebars = require('handlebars');

module.exports = (server) => {
  server.views({
    engines: { html: handlebars },
    relativeTo: __dirname,
    path: '../views',
    layout: 'default',
    layoutPath: '../views/layouts',
    partialsPath: '../views/partials',
  });
}
