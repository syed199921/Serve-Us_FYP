const Feedback = require('../models/feedback_model')
const User = require('../models/user_model')
const axios = require('axios')

let giveFeedback = async (req, res) =>{

    let {review, rating, customer, technician} = req.body
    let feedback = new Feedback({
        review: review,
        rating: rating,
        customer: customer,
        technician: technician
        // service: service
    })
    try{
        await feedback.save()
        return res.json({feedback: feedback})
    }catch(err){
        return res.json({err: err.toString()})
    }

}

let getReviewScores = async (req, res) => {
    // let technicianUsers = []
    // try{
    //      technicianUsers = await User.find({role: "Technician"})
    //     //  return res.json({technicians: technicians})
    // }catch(err){
    //     return res.json({err: err.toString()})
    // }

    let {technicians} = req.body

     technicians = technicians.map((technician) => {
        return technician.technician
    })

    let reviews = await Promise.all( technicians.map( async (technician) => {
        try {
           let review = await Feedback.find({technician: technician.userId})
            return {user: technician, reviews: review}
        }catch(err){
            return res.json({err: err.toString()})
        }
    }))
    let results = null
    try{
        results = await axios.post(" http://127.0.0.1:5000/api/predict", reviews)
    }catch(err){
        return res.json({err: err.toString()})
    }
    let resultData = results.data
    
    let reviewScores = resultData.map((result) => {
        let reviewScore = (result.good_reviews + result.technician_rating)/(result.total_reviews + result.total_ratings)

        return {"review_score": reviewScore, "technician": result.technician}
    })

    let sortedReviewScores = reviewScores.sort((review_1, review_2) => {
        return  review_2.review_score - review_1.review_score
    })

     return res.json({review_scores: sortedReviewScores})

    return res.json({technicians: technicians})   
}



module.exports = {
    giveFeedback,
    getReviewScores
}