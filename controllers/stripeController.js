const express           = require('express');
const router            = express.Router();
const bodyParser        = require('body-parser');
const stripe            = require('stripe')('sk_test_TwTTlid3GeOG6YPydOjARw4I');
// const Checkout          = require('../models/checkout');

router.use(bodyParser.text());

router.post("/", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
}); 

module.exports = router;