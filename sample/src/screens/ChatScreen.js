import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  Container,
  Button,
  Text,
  Icon,
  Left,
  Right,
  Header,
  Title,
  Body,
} from 'native-base';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChat } from '../graphql/mutations';
import { onCreateChat } from '../graphql/subscriptions';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen(props) {
  let { event } = props.route.params;
  const navigation = useNavigation();
  let [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const getChatsByEventQuery = `query GetEvent(
    $id: ID!
    $nextToken: String
    $limit: Int
  ) {
    getEvent(id: $id) {
      id
      chats (
        limit: $limit
        sortDirection: DESC
        nextToken: $nextToken
      ) {
        items  {
          id
          content
          createdAt
          user {
            id
            name
          }
        }
        nextToken
      }
    }
  }
  `;

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    createEventChat(event.id, currentUser.attributes.sub, newMessages[0].text);
  };

  const renderChat = () => {
    if (currentUser)
      return (
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: currentUser.attributes.sub,
            name: currentUser.attributes.given_name
              ? `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`
              : currentUser.username,
          }}
          inverted={true}
          placeholder='Type a message...'
        />
      );
    return <Text>Loading...</Text>;
  };

  async function authUser() {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      setCurrentUser(cognitoUser);
    }
  }

  useEffect(() => {
    const getChatsByEventId = async () => {
      const input = {
        id: event.id,
        nextToken: null,
        limit: 20,
      };

      try {
        const result = await API.graphql(
          graphqlOperation(getChatsByEventQuery, input)
        );
        const existingMessages = result.data.getEvent.chats.items;
        setMessages(
          existingMessages.map((item) => {
            return formatMessage(item);
          })
        );
      } catch (e) {
        console.log(e);
      }
    };

    getChatsByEventId();
  }, [setMessages]);

  useEffect(() => {
    authUser();
    const subscription = API.graphql(graphqlOperation(onCreateChat)).subscribe({
      next: (response) => {
        let newMessageFromResponse = response.value.data.onCreateChat;
        if (
          newMessageFromResponse.event.id === event.id &&
          newMessageFromResponse.user.id !== currentUser.attributes.sub
        ) {
          setMessages(
            GiftedChat.append(messages, formatMessage(newMessageFromResponse))
          );
        }
      },
      error: (error) => {
        console.error(error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

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
          <Title>
            <Text>Live Chat</Text>
          </Title>
        </Body>
        <Right />
      </Header>
      {renderChat()}
    </Container>
  );
}

ChatScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Live Chat',
});

async function createEventChat(eventId, userId, newMessage) {
  const input = {
    input: {
      chatUserId: userId,
      chatEventId: eventId,
      content: newMessage,
    },
  };
  let result = null;
  try {
    result = await API.graphql(graphqlOperation(createChat, input));
  } catch (e) {
    console.log(e);
  }

  return result;
}

function formatMessage(item) {
  return {
    _id: item.id,
    text: item.content,
    createdAt: item.createdAt,
    user: {
      _id: item.user.id,
      name: item.user.name,
      avatar: '',
    },
  };
}
