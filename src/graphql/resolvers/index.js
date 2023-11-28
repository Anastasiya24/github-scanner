import { fetchReposList, fetchRepoDetails } from '../services/github.js';

export const resolvers = {
  Query: {
    fetchRepos: (_, { username, accessToken }) =>
      fetchReposList(username, accessToken),
    fetchRepoDetails: (_, { username, accessToken, repoName }) =>
      fetchRepoDetails(username, accessToken, repoName),
  },
};
