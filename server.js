const express = require('express');
const app = express();
const cors = require('cors');

module.exports = app;

//app.use(express.static(__dirname))

const PORT = process.env.PORT || 3000;

// Middware for parsing request bodies here:
app.use(express.json());


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.get('/', (req, res, next) => {
  res.send("Hello, World")
})


if (!module.parent) { 
  // start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server started and listening on PORT: ${PORT}`)
  })
}
