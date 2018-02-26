"use strict";
var paypal = require('paypal-rest-sdk');
const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET

paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': client_id,
  'client_secret': client_secret
});

console.log(client_secret)