const express = require('express');
const path = require('path');
const pokeneaRoutes = require('./routes/pokeneaRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/pokenea', pokeneaRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;


