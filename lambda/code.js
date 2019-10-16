/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const request = event.request;
  const userAttributes = request.userAttributes;

  if (userAttributes.email.indexOf('@amazon.') !== -1) {
    const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider(
      { apiVersion: '2016-04-18' }
    );
    const groupParams = {
      GroupName: process.env.GROUP,
      UserPoolId: event.userPoolId
    };

    const addUserParams = {
      GroupName: process.env.GROUP,
      UserPoolId: event.userPoolId,
      Username: event.userName
    };

    try {
      await cognitoidentityserviceprovider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoidentityserviceprovider.createGroup(groupParams).promise();
    }

    try {
      await cognitoidentityserviceprovider
        .adminAddUserToGroup(addUserParams)
        .promise();
    } catch (e) {
      callback(e);
    }
  }

  callback(null, event);
};
