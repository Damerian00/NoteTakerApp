const express = require('express');

const app = express();
const PORT = 3001;
app.use(express.json());

app.use(express.static('public'));




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
