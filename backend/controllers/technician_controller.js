
let technicians = require('../data/technicians.json')
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

module.exports = {
    getNearbyTechnicians,
    setLocation,
    generateReviewScore
}