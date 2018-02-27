"use strict";
var paypal = require('paypal-rest-sdk');
const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET


paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': client_id,
  'client_secret': client_secret
});



function createPaypalInvoice(api, receiver_email, amount, currency='USD') {
// Create an invoice JSON object
    var create_invoice_json = {
        "merchant_info": {
            "email": "connector@kava.io",
            "first_name": "Kava",
            "last_name": "Konnector",
            "business_name": "Kava Labs, Inc.",
            "phone": {
                "country_code": "001",
                "national_number": "5555555555"
            },
            "address": {
                "line1": "1234 Main St.",
                "city": "Portland",
                "state": "OR",
                "postal_code": "97217",
                "country_code": "US"
            }
        },
        "billing_info": [{
            "email": receiver_email
        }],
        "items": [{
            "name": "Transfers",
            "quantity": 1.0,
            "unit_price": {
                "currency": "USD",
                "value": amount
            }
        }],
        "note": "Kava Konnector Services",
        "payment_term": {
            "term_type": "NET_45"
        },
        "shipping_info": {
            "first_name": "NA",
            "last_name": "NA",
            "business_name": "Not applicable",
            "phone": {
                "country_code": "001",
                "national_number": "5039871234"
            },
            "address": {
                "line1": "NA",
                "city": "NA",
                "state": "NA",
                "postal_code": "NA",
                "country_code": "NA"
            }
        },
        "tax_inclusive": true,
        "total_amount": {
            "currency": currency,
            "value": amount
        }
    };
    // Create the invoice
    api.invoice.create(create_invoice_json, function (error, invoice) {
        if (error) {
            throw error;
        } else {
            console.log("Create Invoice Response");
            console.log(invoice.id)
            // Send the invoice to the recicpient's email
            api.invoice.send(invoice.id, function (error, rv) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    console.log("Send Invoice Response");
                    console.log(rv);
                }
            });
        }
    });
}

createPaypalInvoice(paypal, "ruaridh.odonnell@gmail.com", 0.50)
