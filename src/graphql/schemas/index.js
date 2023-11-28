import { gql } from 'apollo-server-express';

export const schema = gql`
  type TRepo {
    name: String
    owner: String
    size: String
  }

  type TRepoDetails {
    name: String
    owner: String
    size: String
    privacy: String
    numberOfFiles: Int
    yamlFileContent: String
    activeWebhooks: String
  }

  type Query {
    fetchRepos(username: String!): [TRepo]
    fetchRepoDetails(
      username: String!
      accessToken: String!
      repoName: String!
    ): TRepoDetails
  }
`;