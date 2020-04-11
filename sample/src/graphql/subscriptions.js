/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
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
export const onCreateFollower = /* GraphQL */ `
  subscription OnCreateFollower {
    onCreateFollower {
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
export const onUpdateFollower = /* GraphQL */ `
  subscription OnUpdateFollower {
    onUpdateFollower {
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
export const onDeleteFollower = /* GraphQL */ `
  subscription OnDeleteFollower {
    onDeleteFollower {
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
