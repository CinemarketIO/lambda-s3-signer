// @format
'use strict';

const AWS = require('aws-sdk');

const method = 'putObject';
const signedUrlExpireSeconds = 60 * 5;

function response(statusCode, data) {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
}

module.exports.sign = async (event, context, callback) => {
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();

  let body;
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (err) {
      callback(response(400, {error: 'Wrong content-type or body'}));
    }
  } else {
    callback(response(400, {error: 'No json body present'}));
  }

  // NOTE: s3.getSignedUrl doesn't support promises:
  // https://github.com/aws/aws-sdk-js/issues/1008
  s3.getSignedUrl(
    method,
    {
      Bucket: process.env.S3_BUCKET,
      Key: body.filename,
      Expires: signedUrlExpireSeconds,
    },
    (error, url) => {
      if (error) {
        callback(response(500, {error: error.message}));
      } else {
        callback(null, response(200, {url}));
      }
    },
  );
};
