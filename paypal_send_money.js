"use strict";
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUFDkJxqyL343Y1Eq91ATvkQ2m2ijWdKVaCaCj-yh9DyQakE2ehzogXeUUUq50ihogaECvvSTiVawo_i',
  'client_secret': 'EJ6wJV5Qot9-S6p5xCDjnsKNvWCx_V6d8BD1jZGZ9-ChS1FGRm6CO8woXPVvoPOqFa7lsWyupNiWMnWL'
});

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
                "currency": "USD"
            },
            "receiver": "kjydavis3-facilitator@gmail.com",
            "note": "The moon awaits.",
            "sender_item_id": "kava_demo_2"
        }
    ]
};

var sync_mode = 'false';

paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Create Single Payout Response");
        console.log(payout);
    }
});