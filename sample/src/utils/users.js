import { useEffect, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { createUser, updateUser } from '../graphql/mutations';

function getCognitoUser(bypass = false) {
  let [user, setUser] = useState([]);
  let updateOnce = true;

  const fetchUser = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser({
      bypassCache: bypass,
    });
    // console.log(cognitoUser);
    setUser(cognitoUser);
  };

  useEffect(() => {
    if (updateOnce) fetchUser();
  }, [updateOnce]);

  return user;
}

async function updateDatabaseUser(username, attributes, firsttime = true) {
  if (!username || !attributes) return null;

  const cognitoUser = await Auth.currentAuthenticatedUser();
  const id = attributes.sub;
  const email = attributes.email;
  const phone_number = attributes.phone_number;
  const name = `${attributes.given_name} ${attributes.family_name}`;
  let result = null;

  if (!firsttime) return null;

  const input = {
    input: {
      id,
      email,
      username,
      name,
      phone_number,
    },
  };

  let isNewUser = false;

  try {
    result = await API.graphql(graphqlOperation(createUser, input));
    isNewUser = true;
    console.log('new user!');
  } catch (e) {
    result = await API.graphql(graphqlOperation(updateUser, input));
    console.log('existing user!');
  }

  const pinpointResult = await updateEndpoint(attributes, 'email');
  // if (isNewUser || email !== cognitoUser.attributes.email) {
  // console.log('updateEndpoint', email, attributes);
  // }
  // if (isNewUser || phone_number !== cognitoUser.attributes.phone_number) {
  // console.log('updateEndpoint', phone_number, attributes);
  // pinpointResult = updateEndpoint(attributes, 'phone_number');
  // }

  if (pinpointResult && pinpointResult.MessageBody?.Message === 'Accepted') {
    if (isNewUser) {
      console.log('NewUser');
      Analytics.record({
        name: 'NewUser',
      });
    }
    console.log('updateEndpoint');
    Analytics.record({
      name: 'updateEndpoint',
    });
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
        channelType: 'EMAIL',
        address: attributes.email,
        userId: attributes.sub,
        optOut: 'NONE',
        userAttributes: {
          email: [attributes.email],
          familyName: [attributes.family_name],
          givenName: [attributes.given_name],
          phoneNumber: [attributes.phone_number],
        },
      });
      break;
    // case 'phone_number':
    //   result = await Analytics.updateEndpoint({
    //     ChannelType: 'SMS',
    //     Address: attributes.phone_number,
    //     UserId: attributes.sub,
    //     OptOut: 'NONE',
    //   });
    //   break;
    // case 'push':
    //   let channelType = 'APNS';
    //   if (isSandbox) {
    //     channelType = 'APNS_SANDBOX';
    //   }

    //   result = await Analytics.updateEndpoint({
    //     ChannelType: channelType,
    //     Address: deviceToken,
    //     UserId: attributes.sub,
    //     OptOut: 'NONE',
    //   });
    //   break;
    default:
      console.log('wrong channel ', type, result);
      break;
  }

  return result;
}

exports.getCognitoUser = getCognitoUser;
exports.updateDatabaseUser = updateDatabaseUser;
