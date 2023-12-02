
let technicians = require('../data/technicians.json')
const Web3 = require('web3').default;
const web3 = new Web3('http://127.0.0.1:7545')

function haversineDistance(lat1, lon1, lat2, lon2) {
    const radians = (degrees) => (degrees * Math.PI) / 180;
    // Convert latitude and longitude from degrees to radians
    [lat1, lon1, lat2, lon2] = [lat1, lon1, lat2, lon2].map(radians);

    // Haversine formula
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in kilometers (mean value)
    const earthRadius = 6371.0;

    // Calculate the distance in kilometers
    const distance = earthRadius * c;

    return distance;
};

let getNearbyTechnicians = (req, res) => {
    let {technicians, user} = req.body
    let nearbyTechnicians = technicians.filter((technician) => {
        if(haversineDistance(technician.latitude, technician.longitude, user.latitude, user.longitude) < 10){
            return technician
        }
    })
    return res.json({nearbyTechnicians})
}

let setLocation = (req, res) => {
    let {latitude, longitude, id} = req.body
    technicians.forEach((technician) => {
        if(technician.id == id){
            technician.latitude = latitude
            technician.longitude = longitude
        }
    })
    return res.json({message: "Location updated", technicians: technicians})
}

let generateReviewScore = (req, res) =>{
    let {review_results, nearby_technicians} = req.body
   let reviewScores =  nearby_technicians.map((technician) => {
    let totalRatings = technician.rating
    let reviewScore = 0
    review_results.forEach((reviewResult) => {
    if(reviewResult["id"] == technician.id){
        totalRatings += reviewResult["good reviews"]
        console.log({totalRatings: totalRatings, reviewResult: typeof (reviewResult["total reviews"]) })
        reviewScore = totalRatings / (reviewResult["total reviews"] + 10 )
        console.log({reviewScore: reviewScore})
        //The technician is rated out of 10
        //That is why we add 10 to the total reviews
    }
})
    return {technician: technician, reviewScore: reviewScore}
   })

return res.json({reviewScores: reviewScores})

}

let recommendTechnicians = (req, res) =>{
    let {review_scores} = req.body
    let topTechnicians = review_scores.sort((a, b) => {
        return b["reviewScore"] - a["reviewScore"]
    
    })

    // let recommendedTechnicians = 


    return res.json({"recommendTechnicians": topTechnicians.slice(0, 3)})
}

let  incrementCount = async () => {
const contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "method",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "count",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "caller",
          "type": "address"
        }
      ],
      "name": "Count",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "decrement",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const contractAddress = '0x7836622c9f4c3292312ab9DbaDc1FbE11754B01F'

  const contract = new web3.eth.Contract(contractABI, contractAddress)

//   const accounts = await web3.eth.getAccounts()

const count = await contract.methods.getCount().call()

console.log({count: count})


}

module.exports = {
    getNearbyTechnicians,
    setLocation,
    generateReviewScore,
    recommendTechnicians
}