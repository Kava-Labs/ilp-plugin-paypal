'use strict'

const debug = require('debug')('ilp-plugin-paypal')
const AbstractBtpPlugin = require('ilp-plugin-btp')

class Plugin extends AbstractBtpPlugin {
	
	async sendMoney(amount) {
		// Send money through paypal.
	}
	
	async handleMoney(from, { requestId, data }) {
		// Handle money sent through paypal.
	}
}

Plugin.version = 2
module.exports = Plugin
