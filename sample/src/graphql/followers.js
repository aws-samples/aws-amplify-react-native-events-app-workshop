import { API, graphqlOperation } from 'aws-amplify'

export function createFollower(userId, eventId) {

  // TODO: insert the mutation
  const gqlQuery = ``

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}

export function deleteFollowerById(followerId) {
  const gqlQuery = `mutation deleteFollower{
    deleteFollower(input:{
      id: "${followerId}"
    }) {
      id
    }
  }`

  const gql = graphqlOperation(gqlQuery)

  return API.graphql(gql)
}