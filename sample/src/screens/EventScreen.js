import React, { useEffect, useState } from 'react';
import {
  Container,
  Body,
  Content,
  Button,
  Text,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  List,
  ListItem
} from 'native-base';

import NavigationService from '../utils/NavigationService';

import { API, graphqlOperation } from 'aws-amplify';
import { createFollower, deleteFollower } from '../graphql/mutations';

import EventBox from '../components/EventBox';

export default function EventScreen(props) {
  const { event, currentUser } = props.navigation.state.params;
  let [followers, setFollowers] = useState([]);
  let [follower, setFollower] = useState([]);

  renderFollowers = () => {
    if (followers.length > 0)
      return followers.map(follower => (
        <ListItem key={follower.id}>
          <Text>
            {follower.user.name} (@{follower.user.username})
          </Text>
        </ListItem>
      ));
    return (
      <ListItem>
        <Text>No one yet</Text>
      </ListItem>
    );
  };

  renderActionButton = () => {
    if (follower.length !== 0) {
      return (
        <Card transparent>
          <CardItem>
            <Left />
            <Body>
              <Button danger bordered onPress={() => leaveEvent(follower)}>
                <Text>Leave</Text>
              </Button>
            </Body>
            <Right />
          </CardItem>
        </Card>
      );
    }
    return (
      <Card transparent>
        <CardItem>
          <Left />
          <Body>
            <Button bordered onPress={() => joinEvent(event, currentUser)}>
              <Text>Join Event</Text>
            </Button>
          </Body>
          <Right />
        </CardItem>
      </Card>
    );
  };

  joinEvent = (event, currentUser) => {
    createNewFollower = async () => {
      const input = {
        input: {
          followerUserId: currentUser.attributes.sub,
          followerEventId: event.id
        }
      };

      let result = null;
      try {
        result = await API.graphql(graphqlOperation(createFollower, input));
        const newFollower = result.data.createFollower;
        followers.push(newFollower);
        setFollower(newFollower);
        setFollowers(followers);
      } catch (e) {
        console.log(e);
      }
    };

    createNewFollower();
  };

  getAllFollowers = eventId => {
    const input = {
      id: eventId,
      nextToken: null,
      limit: 10
    };
    useEffect(() => {
      const fetchFollowers = async () => {
        result = await API.graphql(graphqlOperation(getFollowersQuery, input));
        setFollowers(result.data.getEvent.followers.items);
      };
      fetchFollowers();
    }, [setFollowers]);

    const getFollowersQuery = `query GetEvent(
      $id: ID!
      $nextToken: String
      $limit: Int
    ) {
      getEvent(id: $id) {
        id
        followers (
          limit: $limit
          sortDirection: DESC
          nextToken: $nextToken
        ) {
          items  {
            id
            user {
              id
              name
              username
            }
          }
          nextToken
        }
      }
    }
    `;
  };

  leaveEvent = follower => {
    deleteExistingFollower = async () => {
      const input = {
        input: {
          id: follower.id
        }
      };

      let result = null;
      try {
        result = await API.graphql(graphqlOperation(deleteFollower, input));
        var newFollowers = followers.filter(function(item, index, arr) {
          return item.id !== follower.id;
        });
        setFollowers(newFollowers);
        setFollower([]);
      } catch (e) {
        console.log(e);
      }

      return result.data;
    };

    deleteExistingFollower();
  };

  getAllFollowers(event.id);

  useEffect(() => {
    if (followers.length > 0) {
      const findFollower = followers.find(
        element => element.user.id === currentUser.attributes.sub
      );
      if (findFollower) setFollower(findFollower);
    }
  }, [followers]);

  return (
    <Container>
      <Content padder>
        <EventBox isClickable={false} event={event} />
        <List>
          <ListItem itemHeader first>
            <Text>Who's coming</Text>
          </ListItem>
          {renderFollowers(followers)}
        </List>
        {renderActionButton()}
      </Content>
    </Container>
  );
}

function enterChatRoom(props) {
  const { event, currentUser } = props;
  NavigationService.navigate('Chat', { event, currentUser });
}

EventScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Event Details',
  headerRight: (
    <Button transparent onPress={() => enterChatRoom(navigation.state.params)}>
      <Icon name='chatbubbles'></Icon>
    </Button>
  )
});
