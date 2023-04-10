// const express = require('express'),
//       base64Img = require('base64-img'),
//       fs = require('fs'),
//       path = require('path'),
//       cors = require('cors'),
//       bodyParser = require('body-parser'),
//       app = express();

// app.use(cors())
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.static('public'));
// app.use('/images', express.static('images'));

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.post('/img/removebg', (req, res) => {
//     let data = req.body;
//     let getDomain = data.image.split('/');
//     data.image = `${getDomain[0]}//${getDomain[2]}/images/mixer_kitchen.png`;
//     res.json(data);
// })

// // серверний код
// const convert = (req) => {
//   console.log(req);
//   var filepath = base64Img.imgSync(req.image, 'images', 'result');
//   return `http://localhost:3000/${filepath}`; // повертаємо URL зображення
// }

// app.post('/img/removeobj', (req, res ) => {
//   let data = req.body;
//   console.log(data);
//   // const url = convert(data);
//   data.image = `http://localhost:5502/images/result2.png`;
//   res.json(data);
// });

// app.get('/images/shoes.webp', (req, res) => {
//   // Parsing the URL
//   const request = url.parse(req.url, true);
 
//   // Extracting the path of file
//   const action = request.pathname;

//   // Path Refinements
//   const filePath = path.join(__dirname,
//       action).split("%20").join(" ");

//   // Checking if the path exists
//   // fs.exists(filePath, function (exists) {

//   //     if (!exists) {
//   //         res.writeHead(404, {
//   //             "Content-Type": "text/plain"
//   //         });
//   //         res.end("404 Not Found");
//   //         return;
//   //     }

//   //     // Extracting file extension
//   //     const ext = path.extname(action);

//   //     // Setting default Content-Type
//   //     const contentType = "text/plain";

//   //     // Checking if the extension of
//   //     // image is '.png'
//   //     if (ext === ".jpg") {
//   //         contentType = "image/jpg";
//   //     }

//   //     // Setting the headers
//   //     res.writeHead(200, {
//   //         "Content-Type": contentType
//   //     });

//   //     // Reading the file
//   //     fs.readFile(filePath,
//   //         function (err, content) {
//   //             // Serving the image
//   //             res.end(content);
//   //         });
//   // });
// })


// app.listen(3000);


const express = require('express'),
      base64Img = require('base64-img'),
      fs = require('fs'),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      app = express();

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/img/removebg', (req, res) => {
    let data = req.body;
    let getDomain = data.image.split('/');
    data.image = `${getDomain[0]}//${getDomain[2]}/images/mixer_kitchen.png`;
    res.json(data);
})

// серверний код
const convert = async (req) => {
  console.log(req.body)
  base64Img.imgSync(req.image, 'images', 'result');
  // return `http://localhost:3000/${filepath}`; // повертаємо URL зображення
}

app.post('/img/removeobj', (req, res ) => {
  let data = req.body;
  // base64Img.img(data.image, 'images', 'result');
  // res.end('ok');
  console.log(data);
  data.image = `http://localhost:5502/images/result2.png`;
  res.json(data);
});


app.listen(3000);