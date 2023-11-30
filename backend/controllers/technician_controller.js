

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

module.exports = {
    getNearbyTechnicians
}