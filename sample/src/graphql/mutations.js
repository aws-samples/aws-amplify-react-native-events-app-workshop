/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
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
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
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
export const createChat = `mutation CreateChat($input: CreateChatInput!) {
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
export const updateChat = `mutation UpdateChat($input: UpdateChatInput!) {
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
export const deleteChat = `mutation DeleteChat($input: DeleteChatInput!) {
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
export const createFollower = `mutation CreateFollower($input: CreateFollowerInput!) {
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
export const updateFollower = `mutation UpdateFollower($input: UpdateFollowerInput!) {
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
export const deleteFollower = `mutation DeleteFollower($input: DeleteFollowerInput!) {
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
