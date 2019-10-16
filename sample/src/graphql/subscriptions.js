/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
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
export const onCreateEvent = `subscription OnCreateEvent {
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
export const onUpdateEvent = `subscription OnUpdateEvent {
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
export const onDeleteEvent = `subscription OnDeleteEvent {
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
export const onCreateChat = `subscription OnCreateChat {
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
export const onUpdateChat = `subscription OnUpdateChat {
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
export const onDeleteChat = `subscription OnDeleteChat {
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
export const onCreateFollower = `subscription OnCreateFollower {
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
export const onUpdateFollower = `subscription OnUpdateFollower {
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
export const onDeleteFollower = `subscription OnDeleteFollower {
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
