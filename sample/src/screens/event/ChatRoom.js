import React from "react";
import { recordEvent } from '../../aws.js';
import { GiftedChat } from 'react-native-gifted-chat'
import { getChatsByEventId } from '../../graphql/events.js';
import { subscribeToNewChat, createChat } from '../../graphql/chats.js';

export default class ChatRoom extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.event.title}`,
  });
  constructor(props) {
    super(props);
    let { event, user } = this.props.navigation.state.params;
    console.log(user);
    this.state = {
      event: event,
      messages: [],
      isLoading: true,
      user: user,
      newMessage: "",
    }
  }
  componentDidMount() {
    let { user, event } = this.state;
    this.getChats(event.id);
    this.subscribeToChatByEventId(event.id);

    recordEvent(
      'visitChat',
      {
        username: user.username,
        userId: user.attributes.sub,
        eventId: event.id
      }
    );
  }
  componentWillUnmount() {
    try {
      if (this.subscription !== null) {
        this.subscription.unsubscribe();
      }
    } catch (error) {
      console.log(error);
    }
  }
  formatToGiftedMessage = (msg) => {
    return {
      _id: msg.id,
      text: msg.content,
      createdAt: Date.parse(msg.createdAt),
      user: {
        _id: msg.user.username,
        name: msg.user.username,
        avatar: 'https://placeimg.com/140/140/any',
      }
    }
  }
  formatRawMessagesToGiftedMessages = (rawMessages) => {
    let this2 = this;
    return rawMessages.map(function (msg) {
      return this2.formatToGiftedMessage(msg);
    });
  }
  getChats = async (eventId) => {
    var response = await getChatsByEventId(eventId);
    var rawMessages = response.data.getEvent.chats.items;
    rawMessages.sort(function (a, b) {
      return (a.createdAt <= b.createdAt) ? 1 : -1;
    });
    this.appendToGiftedMessage(
      this.formatRawMessagesToGiftedMessages(rawMessages)
    );
  }
  subscribeToChatByEventId = async (eventId) => {
    try {
      let this2 = this;
      let subscription = subscribeToNewChat().subscribe({
        next: (response) => {
          let newMessageFromResponse = response.value.data.onCreateChat;
          console.log(newMessageFromResponse);
          if (newMessageFromResponse.event.id === eventId) {
            this.appendToGiftedMessage([
              this2.formatToGiftedMessage(newMessageFromResponse)
            ]);
          }
        }
      });
      this.subscription = subscription;
    } catch (error) {
      console.log(error);
    }
  }
  saveMessage = async (text) => {
    let { event, user } = this.state;
    try {
      await createChat(user.attributes.sub, event.id, text);
      this.setCurrentText("");
    } catch (e) {
      console.log(e)
    }
  }
  setCurrentText = (text) => {
    this.setState({ newMessage: text });
  }
  onSend = (newMessages = []) => {
    // this.appendToGiftedMessage(newMessages);
    this.saveMessage(this.state.newMessage);

    let { user, event } = this.state;

    recordEvent(
      'addChat',
      {
        username: user.username,
        userId: user.attributes.sub,
        eventId: event.id
      }
    );
  }
  appendToGiftedMessage = (newMessages) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(
        previousState.messages,
        newMessages
      ),
    }));
  }
  render() {
    let { user } = this.state;
    return (
      <GiftedChat
        textInputProps={{ autoFocus: true }}
        messages={this.state.messages}
        inverted={true}
        alwaysShowSend={true}
        loadEarlier={false}
        onSend={messages => this.onSend(messages)}
        onInputTextChanged={text => this.setCurrentText(text)}
        user={{
          _id: user.username,
        }}
      />
    );
  }
}