/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      username
      address
      snapchat_link
      instagram_link
      facebook_link
      linkedin_link
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
        snapchat_link
        instagram_link
        facebook_link
        linkedin_link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
