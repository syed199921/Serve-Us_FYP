const Bill = require('../models/bill_model')


let generateBill = async (req, res) => {
    let {customer, service, bankDetails, status} = req.body
    let bill = new Bill({
        customer: customer,
        service: service,
        dateAndTime: Date.now(),
        bankDetails: bankDetails,
        status: status
    })

    try{
        await bill.save()
        return res.json({bill:bill})
    }catch(err){
        return res.json({err: err.toString()})
    }
}

module.exports = {
    generateBill
}