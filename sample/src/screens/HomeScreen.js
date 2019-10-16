import React, { useEffect, useState } from 'react';
import { Container, Content, Button, Icon } from 'native-base';

import { getCognitoUser, updateDatabaseUser } from '../utils/users';
import NavigationService from '../utils/NavigationService';

import { API, graphqlOperation } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { listEvents } from '../graphql/queries';

import EventBox from '../components/EventBox';

export default function HomeScreen() {
  let user = getCognitoUser();
  const attributes = user.attributes;
  updateDatabaseUser(user.username, attributes);
  const [events, setEvents] = useState([]);
  getAllEvents(events, setEvents);

  renderEvents = allEvents => {
    if (allEvents.length > 0)
      Analytics.record({
        name: 'loaded',
        attributes: {
          screen: 'Home'
        }
      });
    return allEvents.map(event => (
      <EventBox
        currentUser={user}
        isClickable={true}
        key={event.id}
        event={event}
      />
    ));
  };

  getNewEvent = newEvent => {
    setEvents([newEvent, ...events]);
  };

  return (
    <Container>
      <Content padder>{renderEvents(events)}</Content>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  headerTitle: 'Home',
  headerRight: (
    <Button
      transparent
      onPress={() =>
        NavigationService.navigate('Create', {
          onGoBack: data => getNewEvent(data)
        })
      }
    >
      <Icon name='add' style={{ padding: 10 }}></Icon>
    </Button>
  )
};

function getAllEvents(events, setEvents) {
  let hasUpdate = true;
  useEffect(() => {
    fetchEvents();
  }, hasUpdate);

  const input = {
    filter: {
      startAt: {
        ge: parseInt(new Date().getTime() / 1000)
      }
    }
  };

  fetchEvents = async () => {
    const allEvents = await API.graphql(graphqlOperation(listEvents, input));
    setEvents(allEvents.data.listEvents.items);
  };

  return events;
}
