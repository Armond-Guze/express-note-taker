// Importing express package
const express = require("express");
const app = express();
const routes = require('./routes/index');
const PORT = process.env.PORT || 3001;

// Middlewar
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`\nServer located on port http://localhost:${PORT}`);
});