const express = require('express');
const fs = require('fs');
const path = require('path');
const routes = require('./routes/routes')
const PORT = process.env.PORT||3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/routes')(app);

// app.use(routes)

app.listen(PORT, function() {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
