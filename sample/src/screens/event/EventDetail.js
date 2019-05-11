import React from "react";
import moment from 'moment';
import { ScrollView } from "react-native";
import { NavigationActions } from 'react-navigation';
import { View, Text, Button, Icon, List, ListItem } from 'native-base';
import { recordEvent } from '../../aws.js';
import { getEventById, deleteEventById } from '../../graphql/events.js';
import { deleteFollowerById } from '../../graphql/followers.js';

export default class EventDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.event.title}`,
    tabBarVisible: false,
  });
  constructor(props) {
    super(props);
    let { event, user } = this.props.navigation.state.params;
    this.state = {
      event: event,
      user: user,
      followers: [],
      chats: [],
      joined: false,
    }
  }
  componentDidMount() {
    this.getFollowers();

    let { event, user } = this.state;
    recordEvent(
      'visitEvent',
      {
        username: user.username,
        userId: user.attributes.sub,
        eventId: event.id
      }
    );
  }
  getFollowers = async () => {
    let { event, user } = this.state;
    try {
      var response = await getEventById(event.id);
      if (response.data.getEventUserJoinedByEventId !== null) {
        let followers = response.data.getEvent.followers.items;
        let joined = followers.some(function (element) {
          return element.user.username === user.username;
        })
        this.setState({
          followers: followers,
          joined: joined,
        });
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  deleteEvent = async () => {
    let { event } = this.state;
    try {
      await deleteEventById(event.id);
    }
    catch (e) {
      console.log(e)
    }
    this.props.navigation.state.params.updateHomeEvents();
    this.props.navigation.dispatch(NavigationActions.back());
  }
  renderChat = () => {
    let { event, user } = this.state;
    this.props.navigation.navigate("ChatRoom", {
      event: event,
      user: user,
    });
  }
  joinEvent = async () => {
    let { event, user, followers } = this.state;
    try {
      const response = await createFollower(user.attributes.sub, event.id);
      if (response) {
        followers.push(response.data.createFollower);
        this.setState({
          joined: true,
          followers: followers,
        });
        recordEvent(
          'joinEvent',
          {
            username: user.username,
            userId: user.attributes.sub,
            eventId: event.id
          }
        );
      }

    }
    catch (e) {
      console.log(e)
    }
  }
  leaveEvent = async () => {
    let { followers, user, event } = this.state;
    let follower = followers.find(element => element.user.username === user.username);

    try {
      await deleteFollowerById(follower.id);
      this.setState({ joined: false });
      recordEvent(
        'leaveEvent',
        {
          username: user.username,
          userId: user.attributes.sub,
          eventId: event.id
        }
      );
      this.props.navigation.dispatch(NavigationActions.back());
    }
    catch (e) {
      console.log(e)
    }
  }
  renderDeleteButton = () => {
    let { user, event } = this.state;
    if (user.username != event.user.username) {
      return;
    }
    return (
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
        <Button danger onPress={() => this.deleteEvent()}>
          <Icon name='ios-trash' />
          <Text>Delete Event</Text>
        </Button>
      </View>
    )
  }
  renderJoinOrLeaveButton = () => {
    let { joined } = this.state;
    if (joined) {
      return (
        <Button danger
          style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.leaveEvent()}>
          <Text>Leave</Text>
        </Button>
      );
    }
    return (
      <Button primary
        style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => this.joinEvent()}>
        <Text>Join</Text>
      </Button>
    );
  }
  renderFollowers = () => {
    let { user, followers } = this.state;
    if (followers.length == 0) {
      return (
        <View>
          <List>
            <ListItem itemDivider>
              <Text>No one yet!</Text>
            </ListItem>
          </List>
        </View>
      );
    }
    return (
      <View>
        <List>
          <ListItem itemDivider>
            <Text>List of Participates:</Text>
          </ListItem>
          {followers.map((item) => (
            <ListItem key={item.id}><Text>{item.user.username} {item.user.username === user.username && "(You)"}</Text></ListItem>
          ))}
        </List>
      </View>
    );
  }
  render() {
    let { event } = this.state;
    return (
      <ScrollView scrollEventThrottle={16} style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ padding: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: '400' }}>
            <Icon name='ios-alert' style={{ fontSize: 20 }} /> {event.title}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '200' }}>
            <Icon name='code' style={{ fontSize: 20 }} /> {event.description}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '100' }}>
            <Icon name='time' style={{ fontSize: 20 }} /> {moment.unix(event.startAt).calendar()}
          </Text>
          {this.renderDeleteButton()}
        </View>
        <View style={{ height: 70, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%' }}>
          <Button light
            onPress={() => this.renderChat()}
            style={{ width: '40%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#bbbbbb' }}>
            <Text>Chat</Text>
          </Button>
          {this.renderJoinOrLeaveButton()}
        </View>
        {this.renderFollowers()}
      </ScrollView>
    );
  }
}