import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Text,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Icon,
} from 'native-base';

import { API, graphqlOperation } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { listEvents } from '../graphql/queries';

import EventBox from '../components/EventBox';
import { getCognitoUser, updateDatabaseUser } from '../utils/users';

export default function ({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  let user = getCognitoUser();
  updateDatabaseUser(user.username, user.attributes);

  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEvents() {
    const input = {
      filter: {
        startAt: {
          ge: parseInt(new Date().getTime() / 1000),
        },
      },
    };

    const allEvents = await API.graphql(graphqlOperation(listEvents, input));
    // console.log(allEvents.data.listEvents.items);
    setRefreshing(false);
    setEvents(allEvents.data.listEvents.items);
  }

  const renderEvents = () => {
    if (events.length > 0)
      Analytics.record({
        name: 'loaded',
        attributes: {
          screen: 'Home',
        },
      });
    return events.map((event) => (
      <EventBox
        currentUser={user}
        isClickable={true}
        key={event.id}
        event={event}
        navigation={navigation}
      />
    ));
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllEvents();
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Home</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('Create')}>
            <Icon name='add' style={{ padding: 10 }}></Icon>
          </Button>
        </Right>
      </Header>
      <Content
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title='Loading'
          />
        }
        padder
        style={{ alignContent: 'center' }}
      >
        {renderEvents(events)}
      </Content>
    </Container>
  );
}
