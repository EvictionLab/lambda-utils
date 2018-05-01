const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  const res = await lambda.listFunctions({}).promise();
  const functions = res.Functions.filter(f => f.FunctionName.includes('exports-pdf-prod'));

  for (let f of functions) {
    console.log(`Updating ${f.FunctionName}`);
    const params = { FunctionName: f.FunctionName, Description: new Date().toString() };
    await lambda.updateFunctionConfiguration(params, (err, data) => {
      console.log(`Updated ${data.FunctionName} with description ${data.Description}`);
    }).promise();
  }
};
