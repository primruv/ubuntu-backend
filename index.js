const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('./database/mongoose')
const cors = require('cors')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


const Customer = require('./database/models/customer')
app.use(express.json())

app.use(cors())

//add new customer
// app.post('/', (req, res) => {
//   (Customer.create({
//     'name': req.body.name, 'appleId': req.body.appleId, 'phoneNumber': req.body.phoneNumber, 'password': req.body.password, 'package': req.body.package, 'refferalCode': referralCode
//   })).then((customer) => res.send(customer))
//     .catch((error) => console.log(error))
// })

// Using Spread Operator
app.post('/', (req, res) => {
  (Customer.create({
    ...req.body, refferalCode
  })).then((customer) => res.send(customer))
    .catch((error) => console.log(error))
})


//get all customers
app.get('/', (req, res) => {
  Customer.find({})
    .then(customer => res.send(customer))
    .catch((error) => console.log(error))
})

//get all customers
app.get('/:customerId', (req, res) => {
  Customer.find({ _id: req.params.customerId })
    .then((customer) => res.send(customer))
    .catch((error) => console.log(error))
})

//get one customer
app.get('/:customerId', (req, res) => {
  Customer.findOne({ _id: req.params.customerId })
    .then((customer) => res.send(customer))
    .catch((error) => console.log(error))
})

//update one customer
app.patch('/:customerId', (req, res) => {
  Customer.findOneAndUpdate({ '_id': req.params.customerId }, { $set: req.body })
    .then((customer) => res.send(customer))
    .catch((error) => console.log(error))
})


//generate refferal code
function randomString(length, chars) {
  var result = ''
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}
var refferalCode = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

//check if the code generated is in the db
// add it if it does not exists in the db, else bounce registration and generate new refferal code

console.log(refferalCode)

//connecting to the server
app.listen(3000, () => console.log("Server is connected on port 3000"))

