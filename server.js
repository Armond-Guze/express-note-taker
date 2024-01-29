// Importing express package
const express = require('express');
const app = express();

const PORT = process.env.PORT | 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json('public'));

app.listen(PORT, () => {
    console.log(`\nServer located on port http://localhost:${PORT}`)
});