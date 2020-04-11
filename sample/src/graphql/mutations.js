/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent($input: DeleteEventInput!) {
    deleteEvent(input: $input) {
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
export const createChat = /* GraphQL */ `
  mutation CreateChat($input: CreateChatInput!) {
    createChat(input: $input) {
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat($input: UpdateChatInput!) {
    updateChat(input: $input) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat($input: DeleteChatInput!) {
    deleteChat(input: $input) {
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
export const createFollower = /* GraphQL */ `
  mutation CreateFollower($input: CreateFollowerInput!) {
    createFollower(input: $input) {
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
export const updateFollower = /* GraphQL */ `
  mutation UpdateFollower($input: UpdateFollowerInput!) {
    updateFollower(input: $input) {
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
export const deleteFollower = /* GraphQL */ `
  mutation DeleteFollower($input: DeleteFollowerInput!) {
    deleteFollower(input: $input) {
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
