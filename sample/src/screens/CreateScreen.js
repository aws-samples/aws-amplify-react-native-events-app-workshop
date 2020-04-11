import React, { useState } from 'react';
import {
  Container,
  Item,
  Input,
  Body,
  Content,
  Button,
  Text,
  Label,
  Header,
  Left,
  Right,
  Title,
  Form,
} from 'native-base';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';

import { getCognitoUser } from '../utils/users';
import { useFormInput } from '../utils/forms';

import { API, graphqlOperation } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { createEvent } from '../graphql/mutations';

export default function CreateScreen({ navigation }) {
  const [datetime, setDatetime] = useState();
  const [mode, setMode] = useState('datetime');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (datetime) => {
    setDatetime(datetime);
    hideDatePicker();
  };

  let user = getCognitoUser();
  const { attributes } = user;

  let title = useFormInput();
  let description = useFormInput();

  const createNewEvent = async () => {
    if (!title.value || !description.value) {
      alert('Pls fill up the information');
      return;
    }
    const input = {
      input: {
        startAt: Date.parse(datetime) / 1000,
        title: title.value,
        description: description.value,
        eventUserId: attributes.sub,
        status: 'CREATED',
      },
    };

    let result = null;
    try {
      result = await API.graphql(graphqlOperation(createEvent, input));
    } catch (e) {
      console.log(e);
    }

    navigation.navigate('Home', { refreshList: true });

    await Analytics.updateEndpoint({
      userAttributes: {
        latestEvent: [title.value],
      },
    }).then(() => {
      console.log('createdEvent');
      Analytics.record({
        name: 'createdEvent',
        attributes: {
          username: user.username,
          userId: user.attributes.sub,
        },
      });
    });

    return result.data;
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Home</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text>Close</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Title</Label>
            <Input {...title} />
          </Item>
          <Item fixedLabel>
            <Label>Description</Label>
            <Input {...description} />
          </Item>
          <Item fixedLabel last>
            <Label>Date & Time</Label>
            <Input
              onFocus={() => showDatePicker()}
              value={moment(datetime).calendar()}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode={mode}
              datetime={datetime}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </Item>
        </Form>

        <Button full onPress={() => createNewEvent()}>
          <Text>Save</Text>
        </Button>
      </Content>
    </Container>
  );
}
