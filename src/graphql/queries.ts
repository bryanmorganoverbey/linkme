/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      username
      address
      link
      createdAt
      updatedAt
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $username: String
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProfiles(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        address
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
