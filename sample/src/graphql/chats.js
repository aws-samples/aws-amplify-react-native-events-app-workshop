import { API, graphqlOperation } from 'aws-amplify'

export function subscribeToNewChat() {

  // TODO: insert the subscription
  const gqlQuery = ``

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}

export function createChat(userId, eventId, text) {
  const gqlQuery = `mutation createChat {
    createChat(input:{
      chatUserId: "${userId}"
      chatEventId: "${eventId}"
      content: "${text}"
    }) {
      id
      content
      event {
        id
      }
      user {
        id
        username
      }
      createdAt
    }
  }`

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}
