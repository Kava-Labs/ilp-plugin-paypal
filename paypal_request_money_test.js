"use strict";
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUSxLLThPyKIzo6GA8gOxfpkLonwpr_hv9LSULUgSYEueMQsJJ63cIZJS27cFtKLqnICCa2gbmc4ljLD',
  'client_secret': 'EPmKLaxD0_B4Jtp9E_Onx4DLRCHO03RNL421pZurjsxxmGYJQAQf1ruyybaWfCtXx9-CgQ4dIHoA2pex'
});




function createPaypalInvoice(api, receiver_email, amount, currency='USD') {

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
    api.invoice.create(create_invoice_json, function (error, invoice) {
        if (error) {
            throw error;
        } else {
            console.log("Create Invoice Response");
            console.log(invoice.id)
            paypal.invoice.send(invoice.id, function (error, rv) {
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

createPaypalInvoice(paypal, "connector-facilitator@kava.io", 0.90)
