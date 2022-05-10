const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Trans = require('../models/Trans');
const User = require('../models/User');
const { findOne } = require('../models/Trans');
// //Route:1
// //get all the notes using: GET "/api/notes/fetchnotes"  login required

router.get('/fetchtrans/:Acc', fetchuser, async (req, res) => {

    try {
        const trans = await Trans.find({ senderAcc: req.params.Acc });

        res.json(trans)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// // Route:2
// // add note using: POST "/api/notes/send"  login required

router.post('/send', fetchuser, [
    body('receiverAcc', 'Enter a valid account number').isNumeric(),
    body('senderAcc', 'Enter a valid account number').isNumeric(),
    body('Amount', 'please enter amount').notEmpty()

], async (req, res) => {
    try {
        const { receiverAcc, Amount, senderAcc } = req.body;
        // if there are errors,return Bad requist and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (senderAcc == receiverAcc) {
            return res.status(401).send("Can Not transfer to self Account");
        }
        let capital = await User.findOne({ Acc: senderAcc });
        // let capital2 = await User.findOne({ Acc: receiverAcc });

        let user = await User.findOne({ receiverAcc });
       
        const newBal = parseInt(user.balance) + parseInt(Amount);
        const addMoney = {};
        if (Amount) { addMoney.balance = newBal }

        // const Credit = {};
        // if (Amount) { Credit.balance = parseInt(capital2.balance) + parseInt(Amount) };
        // // console.log(Credit);

        const Debit = {};
        if (Amount) { Debit.balance = parseInt(capital.balance) - parseInt(Amount) };
        // console.log(Debit);
        // find the note to be updated and update it
        let receiver = await User.findOne({ receiverAcc });
        if (!receiver) {
            return res.status(404).send("Reciver Account Not Found")
        }

        if ((capital.balance - Amount) < 0) {
            return res.status(401).send("Balance Low");
        }

        const credit = await User.findOneAndUpdate(receiverAcc, { $set: addMoney }, { new: true })

        const debit = await User.findOneAndUpdate(senderAcc, { $set: Debit }, { new: true })

        const balance = Amount;
        const tran = new Trans({
            receiverAcc, balance, senderAcc, user: req.user.id
        })
        const saveTrans = await tran.save();
        res.json({ saveTrans, credit, debit });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route:3
// // add note using: POST "/api/notes/add"  login required

router.post('/add', fetchuser, [
    body('Acc', 'Enter a valid account number').isNumeric(),
    body('balance', 'please enter amount').notEmpty()

], async (req, res) => {
    try {
        const { Acc, balance } = req.body;
        // if there are errors,return Bad requist and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let user = await User.findOne({ Acc });
        if (!user) {
            return res.status(404).send("User Account Not Found")
        }
        const newBal = parseInt(user.balance) + parseInt(balance);
        const addMoney = {};
        if (balance) { addMoney.balance = newBal }

        money = await User.findByIdAndUpdate(user._id, { $set: addMoney }, { new: true });
        res.json({ money })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router