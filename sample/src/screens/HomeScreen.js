import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
  Container,
  Header,
  Body,
  Button,
  Text,
  Title,
  Content,
  Left,
  Right,
  Icon,
  Spinner,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import { listEvents } from '../graphql/queries';
import { deleteEvent } from '../graphql/mutations';

import EventBox from '../components/EventBox';
import { updateDatabaseUser } from '../utils/users';

export default function ({ navigation, route }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [user, setUser] = useState([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (route.params?.refreshList) {
      setRefreshing(true);
    }
    authUser();
    getAllEvents();
  }, [route.params]);

  async function authUser() {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      setUser(cognitoUser);
      updateDatabaseUser(cognitoUser.username, cognitoUser.attributes, loaded);
      setLoaded(false);
      Analytics.record({
        name: 'loaded',
      });
    }
  }

  async function getAllEvents() {
    const filters = {
      startAt: {
        ge: parseInt(new Date().getTime() / 1000),
      },
    };

    const limit = 10;
    const allEvents = await API.graphql(
      graphqlOperation(listEvents, filters, limit)
    );
    setRefreshing(false);
    setEvents(
      allEvents.data.listEvents.items.sort(function (a, b) {
        if (!a.key) a.key = a.id;
        if (!b.key) b.key = b.id;
        return a.startAt === b.startAt ? 0 : a.startAt < b.startAt ? -1 : 1;
      })
    );
  }

  async function deleteEventById(eventId) {
    setRefreshing(true);
    Analytics.record({
      name: 'deleteEvent',
      attributes: {
        eventId: eventId,
        userId: user.attributes.sub,
      },
    });
    const details = {
      id: eventId,
    };
    await API.graphql(graphqlOperation(deleteEvent, { input: details }));
    getAllEvents();
  }

  const renderEvents = () => {
    return (
      <SwipeListView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title='Loading'
          />
        }
        data={events}
        renderItem={(rowData) => (
          <EventBox isClickable={true} event={rowData.item} />
        )}
        renderHiddenItem={(rowData) => {
          const disabledButton = () => (
            <Button
              disabled
              bordered
              style={{ width: 100, justifyContent: 'center' }}
            >
              <Text>Delete</Text>
            </Button>
          );
          const enabledButton = () => (
            <Content>
              <Button
                danger
                style={{ width: 100, justifyContent: 'center' }}
                onPress={() => deleteEventById(rowData.item.id)}
              >
                <Text>Delete</Text>
              </Button>
              {refreshing && <Spinner color='red' />}
            </Content>
          );
          const renderButton = () => {
            if (rowData.item.user.username === user.username)
              return enabledButton();
            return disabledButton();
          };
          return (
            <Content
              style={{
                alignSelf: 'flex-end',
                padding: 10,
                alignContent: 'center',
              }}
            >
              {renderButton()}
            </Content>
          );
        }}
        rightOpenValue={-125}
        style={{ padding: 10 }}
        disableRightSwipe={true}
        closeOnRowOpen={true}
        closeOnScroll={true}
      />
    );
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
            <Icon name='add'></Icon>
          </Button>
        </Right>
      </Header>
      {renderEvents(events)}
    </Container>
  );
}
