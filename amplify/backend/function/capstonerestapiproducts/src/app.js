var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient();

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});



const products = [
  { id: 1, name: 'Philly Cheesesteak', price: '10.49', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/PatsCheesesteak.jpg/1600px-PatsCheesesteak.jpg' },
  { id: 2, name: 'Chicken Parm', price: '9.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/BK_Original_Chicken_Sandwich.JPG/1200px-BK_Original_Chicken_Sandwich.JPG' },
  { id: 3, name: 'Bahn Mi', price: '11.49', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png/240px-B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png' },
  { id: 4, name: 'Bratwurst', price: '7.49', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rostbratwurstbrot.png/240px-Rostbratwurstbrot.png' },
  { id: 5, name: 'Chivito', price: '10.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Chivito1.jpg/500px-Chivito1.jpg' },
  { id: 6, name: 'Choripan', price: '5.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Choripan.jpg/240px-Choripan.jpg' },
  { id: 7, name: 'Corned Beef', price: '11.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Katzs_deli_corned_beef.jpg/240px-Katzs_deli_corned_beef.jpg' },
  { id: 8, name: 'Cuban', price: '8.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tampa_Cuban_sandwich.jpg/240px-Tampa_Cuban_sandwich.jpg' },
  { id: 9, name: 'Francesinha', price: '12.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Francesinhacaseira.JPG/240px-Francesinhacaseira.JPG' },
  { id: 10, name: 'French Dip', price: '9.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/French_dip.jpg/240px-French_dip.jpg' },
  { id: 11, name: 'Gyro', price: '8.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pita_giros.JPG/240px-Pita_giros.JPG' },
  { id: 12, name: 'Lobster Roll', price: '31.99', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lobster_Roll_at_the_Lobster_Claw%2C_Bar_Harbor.jpg/240px-Lobster_Roll_at_the_Lobster_Claw%2C_Bar_Harbor.jpg' },
];

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**********************
 * Example get method *
 **********************/

app.get('/products', function(req, res) {
  const params = {
    TableName: "productstable-staging"
  }
  docClient.scan(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ data })
  })
  // res.json({ success: 'get call succeed!', url: req.url, products });
});

app.get('/products/:id', function(req, res) {
  const params = {
    TableName: "productstable-staging",
    Key: {
      id: req.params.id
    }
  }

  docClient.get(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ data })
  });
});

/****************************
* Example post method *
****************************/

app.post('/products', function(req, res) {
  const params = {
    TableName: "productstable-staging",
    Item: {
      id: id(),
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ success: 'Product created successfully!' })
  })
  // Add your code here
  // res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/products/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/products', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/products/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/products', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/products/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
