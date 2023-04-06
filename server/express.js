const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/img/removebg', (req, res) => {
    let data = req.body;
    data.image = 'http://127.0.0.1:5502/images/mixer_kitchen.png';
    res.json(data);
})

app.listen(3000);