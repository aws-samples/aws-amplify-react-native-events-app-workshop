import React, { useState } from 'react';
import {
  Container,
  Item,
  Input,
  Body,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Label
} from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { getCognitoUser } from '../utils/users';
import { useFormInput } from '../utils/forms';

import { API, graphqlOperation } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { createEvent } from '../graphql/mutations';

import NavigationService from '../utils/NavigationService';

export default function CreateScreen(props) {
  let user = getCognitoUser();
  const { attributes } = user;

  let title = useFormInput();
  let description = useFormInput();
  const [dateTimeStart, setDateTimeStart] = useState(new Date().toUTCString());
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);

  createNewEvent = async () => {
    const input = {
      input: {
        startAt: Date.parse(dateTimeStart) / 1000,
        title: title.value,
        description: description.value,
        eventUserId: attributes.sub,
        status: 'CREATED'
      }
    };
    let result = null;
    try {
      result = await API.graphql(graphqlOperation(createEvent, input));
    } catch (e) {
      console.log(e);
    }

    props.navigation.state.params.onGoBack(result.data.createEvent);
    Analytics.record({
      name: 'createdEvent',
      attributes: {
        username: user.username,
        userId: user.attributes.sub,
        eventId: result.data.createEvent.id
      }
    });
    NavigationService.close();

    return result.data;
  };

  function handleDatePicked(datetime) {
    setDatePickerIsVisible(false);
    setDateTimeStart(datetime.toUTCString());
  }

  return (
    <Container>
      <Content>
        <List>
          <ListItem>
            <Body>
              <Item fixedLabel>
                <Label>Title</Label>
                <Input {...title} />
              </Item>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Item fixedLabel>
                <Label>Description</Label>
                <Input {...description} />
              </Item>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Item fixedLabel>
                <Label>Date & Time</Label>
                <Input
                  onFocus={() => setDatePickerIsVisible(true)}
                  value={dateTimeStart}
                />
                <DateTimePicker
                  isVisible={datePickerIsVisible}
                  onConfirm={handleDatePicked}
                  onCancel={() => setDatePickerIsVisible(false)}
                  mode='datetime'
                />
              </Item>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

CreateScreen.navigationOptions = {
  headerTitle: 'New Event',
  headerRight: (
    <Button transparent onPress={() => createNewEvent()}>
      <Text>Save</Text>
    </Button>
  )
};
