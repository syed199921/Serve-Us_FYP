const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const technician_router = require('./routes/technician_routes')
const customer_router = require('./routes/customer_routes')
const appointment_router = require('./routes/appointment_routes')
// const connectToDB = require('./mongodb/db_connection')



// const Web3 = require('web3').default;
// const web3 = new Web3('http://127.0.0.1:7545')




const mongoose = require('mongoose');
//configure dotenv 
require('dotenv').config()

const app = express()
//middleware
app.use(bodyParser.json())


const PORT = 3000

let technicians = [
    {
        id: 1,
        name: 'John Doe',
        latitude: 40.730610,
        longitude: -73.935242,
        reviews: ["I liked the work of the technician", "The technician was very professional"],
        rating: 9
    },
    {
        id: 2,
        name: 'Charles Dickens',
        latitude: 40.730610,
        longitude: -73.935242,
        reviews: ["The technician was very late. He was very rude as well", "I liked the technician"],
        rating: 6 
    },
    {
        id: 3,
        name: 'Thomas Hardy',
        latitude: 40.730610,
        longitude: -73.935242,
        reviews: ["The technician did not know what he was doing", "The technician didn't have the right tools"],
        rating: 3
    }
]

let user = {
    id: 1,
    name: 'Syed Zulkifal Banuri',
    latitude: 40.730610,
    longitude: -73.935242,
}

let nearbyTechnicians = []

app.post('/location', (req, res) => {
let {latitude, longitude, id} = req.body
technicians.forEach((technician) => {
    console.log("technician.id" + technician.id)
    console.log("id: " + id)
    if(technician.id == id){
        technician.latitude = latitude
        technician.longitude = longitude
    }
})
return res.json({message: "Location updated", technicians: technicians})
})

app.get('/technicians', (req, res) => {
    return res.json({technicians})
})

// app.get('/nearbyTechnicians', (req, res) => {
// nearbyTechnicians = technicians.filter((technician) => {
//     if(haversineDistance(technician.latitude, technician.longitude, user.latitude, user.longitude) < 10){
//         return technician
//     }
// })
// return res.json({nearbyTechnicians})
// })

app.use('/technician', technician_router)
app.use('/customer', customer_router)
app.use('/appointment', appointment_router)



let generateReviewScore = (technicians) => {
    axios.get('http://127.0.0.1:5000/api/predict').then( response =>{
        console.log(response.data)
    })
}

// generateReviewScore(technicians)

app.listen(process.env.PORT, () =>{
    // incrementCount()
    console.log(`Server running on port ${process.env.PORT}`)
   
    
        // mongoose.connect(process.env.MONGODB_URI)
        
        // let connection = mongoose.connection
        
        // connection.on('error', () =>{
        //     console.log("Connection to database failed")
        // })
        
        // connection.once('open', () =>{
        //     console.log("Connected to database")
        // })

        
    
})


// let  incrementCount = async () => {
//     const contractABI = [
//         {
//           "constant": true,
//           "inputs": [],
//           "name": "count",
//           "outputs": [
//             {
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "payable": false,
//           "stateMutability": "view",
//           "type": "function"
//         },
//         {
//           "anonymous": false,
//           "inputs": [
//             {
//               "indexed": false,
//               "name": "method",
//               "type": "string"
//             },
//             {
//               "indexed": false,
//               "name": "count",
//               "type": "uint256"
//             },
//             {
//               "indexed": false,
//               "name": "caller",
//               "type": "address"
//             }
//           ],
//           "name": "Count",
//           "type": "event"
//         },
//         {
//           "constant": false,
//           "inputs": [],
//           "name": "increment",
//           "outputs": [],
//           "payable": false,
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "constant": false,
//           "inputs": [],
//           "name": "decrement",
//           "outputs": [],
//           "payable": false,
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "constant": true,
//           "inputs": [],
//           "name": "getCount",
//           "outputs": [
//             {
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "payable": false,
//           "stateMutability": "view",
//           "type": "function"
//         }
//       ]
    
//       const contractAddress = '0x7836622c9f4c3292312ab9DbaDc1FbE11754B01F'
    
//       const contract = new web3.eth.Contract(contractABI, contractAddress)
    
//       const accounts = await web3.eth.getAccounts()
//       await contract.methods.increment().send({from: accounts[0]})
    
//     const count = await contract.methods.getCount().call()
    
//     console.log({count: Number(count)})
    
    
    // }