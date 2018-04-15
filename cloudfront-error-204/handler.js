'use strict';

// Convert CloudFront error responses to a 204 status code
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    console.log(request);

    const response = { status: '204' };
  
    callback(null, request);
};
