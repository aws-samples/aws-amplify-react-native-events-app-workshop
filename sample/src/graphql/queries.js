/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone_number
      username
      events {
        items {
          id
          title
          description
          status
          startAt
        }
        nextToken
      }
      chats {
        items {
          id
          content
          createdAt
        }
        nextToken
      }
      followers {
        items {
          id
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone_number
        username
        events {
          nextToken
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      description
      status
      user {
        id
        name
        email
        phone_number
        username
        events {
          nextToken
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
      }
      chats {
        items {
          id
          content
          createdAt
        }
        nextToken
      }
      followers {
        items {
          id
        }
        nextToken
      }
      startAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        user {
          id
          name
          email
          phone_number
          username
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
        startAt
      }
      nextToken
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      id
      content
      user {
        id
        name
        email
        phone_number
        username
        events {
          nextToken
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
      }
      event {
        id
        title
        description
        status
        user {
          id
          name
          email
          phone_number
          username
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
        startAt
      }
      createdAt
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        user {
          id
          name
          email
          phone_number
          username
        }
        event {
          id
          title
          description
          status
          startAt
        }
        createdAt
      }
      nextToken
    }
  }
`;
export const getFollower = /* GraphQL */ `
  query GetFollower($id: ID!) {
    getFollower(id: $id) {
      id
      user {
        id
        name
        email
        phone_number
        username
        events {
          nextToken
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
      }
      event {
        id
        title
        description
        status
        user {
          id
          name
          email
          phone_number
          username
        }
        chats {
          nextToken
        }
        followers {
          nextToken
        }
        startAt
      }
    }
  }
`;
export const listFollowers = /* GraphQL */ `
  query ListFollowers(
    $filter: ModelFollowerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          name
          email
          phone_number
          username
        }
        event {
          id
          title
          description
          status
          startAt
        }
      }
      nextToken
    }
  }
`;
