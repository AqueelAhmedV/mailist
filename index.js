const express = require('express');

const mail = require('./api/routes/mail');

const app = express();

app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      });

app.use('/api/uc/', mail)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`));