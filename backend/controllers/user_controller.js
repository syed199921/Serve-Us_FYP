const User = require('../models/user_model')

let signUp = async (req, res) => {
    let {userId, role, contactNumber, password} = req.body
    let user = new User({
        userId: userId,
        role: role,
        contactNumber: contactNumber,
        password: password
    })
    try {
        let savedUser = await user.save()
        res.json({user: saveUser})
    }catch(err){
        res.json({err: err})
    }
}

module.exports = {
    signUp
}