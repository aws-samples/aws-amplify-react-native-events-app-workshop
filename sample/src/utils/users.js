import { useEffect, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { createUser, updateUser } from '../graphql/mutations';

function getCognitoUser(bypass = false) {
  let [user, setUser] = useState([]);
  let updateOnce = true;

  const fetchUser = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser({
      bypassCache: bypass
    });
    // console.log(cognitoUser);
    setUser(cognitoUser);
  };

  useEffect(() => {
    if (updateOnce) fetchUser();
  }, [updateOnce]);

  return user;
}

async function updateDatabaseUser(username, attributes) {
  if (!username || !attributes) return null;

  const id = attributes.sub;
  const email = attributes.email;
  const phone_number = attributes.phone_number;
  const name = `${attributes.given_name} ${attributes.family_name}`;
  let result = null;
  const input = {
    input: {
      id,
      email,
      username,
      name,
      phone_number
    }
  };

  try {
    result = await API.graphql(graphqlOperation(createUser, input));
  } catch (e) {
    result = await API.graphql(graphqlOperation(updateUser, input));
  }

  if (email) {
    updateEndpoint(attributes, 'email');
  }
  if (phone_number) {
    updateEndpoint(attributes, 'phone_number');
  }

  return result.data;
}

async function updateEndpoint(
  attributes,
  type = 'email',
  isSandbox = true,
  deviceToken = ''
) {
  let result = null;
  switch (type) {
    case 'email':
      result = await Analytics.updateEndpoint({
        ChannelType: 'EMAIL',
        Address: attributes.email,
        UserId: attributes.sub,
        OptOut: 'NONE'
      });
      break;
    case 'phone_number':
      result = await Analytics.updateEndpoint({
        ChannelType: 'SMS',
        Address: attributes.phone_number,
        UserId: attributes.sub,
        OptOut: 'NONE'
      });
      break;
    case 'push':
      let channelType = 'APNS';
      if (isSandbox) {
        channelType = 'APNS_SANDBOX';
      }

      result = await Analytics.updateEndpoint({
        ChannelType: channelType,
        Address: deviceToken,
        UserId: attributes.sub,
        OptOut: 'NONE'
      });
      break;
    default:
      console.log('wrong channel ', type);
      break;
  }
  return result;
}

exports.getCognitoUser = getCognitoUser;
exports.updateDatabaseUser = updateDatabaseUser;
