const Payment = require('../models/payment_model')
let date = new Date()
let payByCash = async (req, res) => {
    let {bill, amountPaid,  paymentMethod, status} = req.body

    let payment = new Payment({
        bill: bill,
        amountPaid: amountPaid,
        paymentMethod: paymentMethod,
        paymentDate: date.getDate(),
        status: status
    })

    try{
        await payment.save()
        return res.json({payment:payment})
    }catch(err){
        return res.json({err: err.toString()})
    }
}

module.exports = {
    payByCash
}