const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    process.stdout.write(`Server running on port ${PORT}\n`);
  }
});

module.exports = server;


