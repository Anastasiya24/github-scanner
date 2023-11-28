import axios from 'axios';

export const fetchRepos = async (username) => {
  try {
    const response = await axios.get(`${process.env.GITHUB_API_URL}/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error.message);
  }
}

export const fetchRepoDetail = async (username, accessToken, repoName) => {
  try {
    const response = await axios.get(
      `${process.env.GITHUB_API_URL}/repos/${username}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error.message);
  }
}

export const fetchRepoFiles = async (username, repoName) => {
  try {
    const response = await axios.get(`${process.env.GITHUB_API_URL}/repos/${username}/${repoName}/git/trees/master?recursive=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error.message);
  }
}

export const fetchFileContent = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error.message);
  }
}

export const fetchRepoHooks = async (username, repoName) => {
  try {
    const response = await axios.get(
      `${process.env.GITHUB_API_URL}/repos/${username}/${repoName}/hooks`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error.message);
  }
}