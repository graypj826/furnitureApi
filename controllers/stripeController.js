const express           = require('express');
const router            = express.Router();
const bodyParser        = require('body-parser');
const stripe            = require('stripe')('pk_test_qZbWBsGhk9N3YZgwePpA3tez');
// const Checkout          = require('../models/checkout');

router.use(bodyParser.text());

router.post("/", async (req, res) => {
  console.log("------------------------------------stripe charge received")
  console.log(req.body, "---------- this is req.body")
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
}); 

module.exports = router;