import { API, graphqlOperation } from 'aws-amplify'

export function getAllEvents(timestamp) {

  // TODO: insert the query
  const gqlQuery = ``

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}

export function createEvent(title, description, dateTimeStart, userId) {
  const gqlQuery = `mutation createEvent {
    createEvent(input:{
      description: "${description}"
      startAt: ${dateTimeStart}
      title: "${title}"
      eventUserId: "${userId}"
    }) {
      id
    }
  }`

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}

export function getEventById(eventId) {
  const gqlQuery = `query getEvent{
    getEvent(id:"${eventId}") {
      id
      followers{
        items{
          id
          user{
            id
            username
          }
        }
      }
    }
  }`

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}

export function getChatsByEventId(eventId) {
  const gqlQuery = `query getEvent{
    getEvent(id:"${eventId}") {
      chats{
        items{
          id
          content
          user{
            id
            username
          }
          createdAt
        }
      }
    }
  }`

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}

export function deleteEventById(eventId) {
  const gqlQuery = `mutation deleteEvent {
    deleteEvent(input:{
      id: "${eventId}"
    }){
      id
   }
  }`

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}