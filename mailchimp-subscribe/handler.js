'use strict';
const https = require('https');
const querystring = require('querystring');

exports.handler = (event, context, callback) => {
  const params = querystring.parse(event.body);
  const callbackParams = {
    statusCode: 302,
    headers: { Location: process.env['REDIRECT_URL'] }
  };

  // Exit if the honeypot is filled out
  if (process.env['HONEYPOT_ID'] in params && params[process.env['HONEYPOT_ID'] !== '']) {
    callback(null, callbackParams);
  }

  // Add to data group
  const interests = {};
  interests[process.env['INTEREST_ID']] = true;
  interests[process.env['NEWSLETTER_INTEREST_ID']] = 'newsletter' in params;

  const body = JSON.stringify({
    email_address: params['email'],
    status: 'subscribed',
    interests
  });

  const options = {
    hostname: 'us16.api.mailchimp.com',
    port: 443,
    path: `/3.0/lists/${process.env['LIST_ID']}/members`,
    method: 'POST',
    auth: `user:${process.env['API_KEY']}`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    }
  };

  const req = https.request(options, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      console.log(data);
      callback(null, callbackParams);
    });
  });

  req.on('error', e => {
    console.error(e);
    callback(null, callbackParams);
  });

  req.write(body);
};
