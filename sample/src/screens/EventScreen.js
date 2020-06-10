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
  ListItem,
  Header,
  Title,
} from 'native-base';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createFollower, deleteFollower } from '../graphql/mutations';

import EventBox from '../components/EventBox';

export default function EventScreen(props) {
  let { event } = props.route.params;
  let { navigation } = props;
  let [currentUser, setCurrentUser] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [follower, setFollower] = useState([]);
  let [pending, setPending] = useState(false);

  async function authUser() {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      setCurrentUser(cognitoUser);
    }
  }

  // TODO: workshop, insert your graphql query here to get all followers
  const getFollowersQuery = ``;

  renderFollowers = () => {
    if (followers.length > 0)
      return followers.map((follower) => (
        <ListItem key={follower.id}>
          <Text>
            {follower.user.name !== 'undefined undefined'
              ? follower.user.name + '(@' + follower.user.username + ')'
              : '@' + follower.user.username}
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
    if (!pending) {
      createNewFollower = async () => {
        const input = {
          input: {
            followerUserId: currentUser.attributes.sub,
            followerEventId: event.id,
          },
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
        setPending(false);
      };
      setPending(true);
      createNewFollower();
    }
  };

  getAllFollowers = (eventId) => {
    const input = {
      id: eventId,
      nextToken: null,
      limit: 10,
    };
    useEffect(() => {
      const fetchFollowers = async () => {
        result = await API.graphql(graphqlOperation(getFollowersQuery, input));
        setFollowers(result.data.getEvent.followers.items);
      };
      fetchFollowers();
    }, [setFollowers]);
  };

  leaveEvent = (follower) => {
    if (!pending) {
      deleteExistingFollower = async () => {
        const input = {
          input: {
            id: follower.id,
          },
        };

        let result = null;
        try {
          result = await API.graphql(graphqlOperation(deleteFollower, input));
          var newFollowers = followers.filter(function (item, index, arr) {
            return item.id !== follower.id;
          });
          setFollowers(newFollowers);
          setFollower([]);
        } catch (e) {
          console.log(e);
        }

        setPending(false);
        return result.data;
      };

      setPending(true);
      deleteExistingFollower();
    }
  };

  getAllFollowers(event.id);

  useEffect(() => {
    authUser();
    if (followers.length > 0) {
      const findFollower = followers.find(
        (element) => element.user.id === currentUser.attributes.sub
      );
      if (findFollower) setFollower(findFollower);
    }
  }, [followers]);

  const enterChatRoom = (props) => {
    const { event, currentUser } = props;
    navigation.navigate('Chat', { event, currentUser });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='ios-arrow-back'></Icon>
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>Event Details</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => enterChatRoom(props.route.params)}>
            <Icon name='chatbubbles'></Icon>
          </Button>
        </Right>
      </Header>
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
