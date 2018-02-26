"use strict";
var paypal = require('paypal-rest-sdk');
const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET


paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': client_id,
  'client_secret': client_secret
});

function sendPaypalPayment(api, receiver_email, amount, currency='USD') {
    var sender_batch_id = Math.random().toString(36).substring(9);
    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "Kava Testing Paypal SDK"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": 0.90,
                    "currency": currency
                },
                "receiver": receiver_email,
                "note": "The moon awaits.",
                "sender_item_id": "kava_demo_2"
            }
        ]
    };
    var sync_mode = 'false';
    api.payout.create(create_payout_json, sync_mode, function (error, payout) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Create Single Payout Response");
            console.log(payout);
        }
    });
}


