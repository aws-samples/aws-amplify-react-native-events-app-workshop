import Amplify, { Analytics, Auth } from 'aws-amplify';

import aws_exports from '../aws-exports.js';

export const initializeAmplify = () => {
  Amplify.configure(aws_exports);
  // Amplify.Logger.LOG_LEVEL = 'DEBUG';
}

export const recordEvent = (eventName, attributes) => {
  let data = {
    name: eventName,
    attributes: attributes
  };
  console.log(data);
  Analytics.record(data);
};

export const registerEndpoint = (data) => {
  Analytics.updateEndpoint({
    address: data.Phone ? `+1${data.Phone}` : data.Email,
    channelType: data.Address == 'Phone' ? 'SMS' : 'EMAIL',
    attributes: {
      name: [data.Name],
      role: [data.Role]
    },
    optOut: 'NONE'
  });
};

export const getUser = () => {
  return Auth.currentAuthenticatedUser()
}