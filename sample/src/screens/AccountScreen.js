import React from 'react';
import {
  Container,
  Thumbnail,
  Item,
  Input,
  Body,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Label,
  View,
  Toast,
  Root,
  Left,
  Right,
  Header,
  Title,
} from 'native-base';
import { Auth } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';

import { getCognitoUser, updateDatabaseUser } from '../utils/users';
import { useFormInput } from '../utils/forms';

export default function AccountScreen() {
  let user = getCognitoUser(true);
  const { attributes } = user;
  let firstName = useFormInput(attributes ? attributes.given_name : '');
  let lastName = useFormInput(attributes ? attributes.family_name : '');
  let phoneNumber = useFormInput(attributes ? attributes.phone_number : '');
  const email = useFormInput(attributes ? attributes.email : '');

  updateParticulars = async () => {
    const updatedAttributes = {
      given_name: firstName.value,
      family_name: lastName.value,
      phone_number: phoneNumber.value,
    };

    Analytics.record({
      name: 'updateParticulars',
      attributes: {
        email: email.value,
        ...updatedAttributes,
      },
    });

    console.log('Analytics', {
      name: 'updateParticulars',
      attributes: {
        email: email.value,
        ...updatedAttributes,
      },
    });

    let result = await Auth.updateUserAttributes(user, updatedAttributes)
      .catch((err) => {
        console.error(err);
        return err;
      })
      .then((res) => {
        return res;
      });
    Toast.show({
      text: `${result}!`,
      buttonText: 'Okay',
      position: 'top',
    });
    if (result === 'SUCCESS') {
      updateDatabaseUser(user.username, {
        ...attributes,
        ...updatedAttributes,
      });
    }
    return result;
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>
            <Text>Account</Text>
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={() => updateParticulars()}>
            <Text>Save</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Root>
          <List>
            <ListItem itemHeader>
              <Body
                style={{
                  flexDirection: 'column',
                  alignContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <View style={{}}>
                  <Thumbnail
                    large
                    source={{ uri: 'http://placekitten.com/300/300' }}
                  />
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingTop: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    @{user.username}
                  </Text>
                  <Text
                    note
                    style={{
                      textAlign: 'center',
                      padding: 5,
                    }}
                  >
                    {attributes ? attributes.email : ''}
                  </Text>
                </View>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Item fixedLabel>
                  <Label>First Name</Label>
                  <Input {...firstName} />
                </Item>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Item fixedLabel>
                  <Label>Last Name</Label>
                  <Input {...lastName} />
                </Item>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Item fixedLabel>
                  <Label>Phone Number</Label>
                  <Input {...phoneNumber} />
                </Item>
              </Body>
            </ListItem>
            <ListItem last>
              <Body>
                <Button transparent onPress={() => Auth.signOut()}>
                  <Text>Sign Out</Text>
                </Button>
              </Body>
            </ListItem>
          </List>
        </Root>
      </Content>
    </Container>
  );
}
