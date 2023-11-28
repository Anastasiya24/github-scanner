import { fetchRepos, fetchRepoDetail, fetchRepoFiles, fetchFileContent, fetchRepoHooks} from '../../utils/github-service.js';

export const fetchReposList = async (username) => {
  const repositories = await fetchRepos(username);

  const repoData = [];

  repositories.forEach((repo) => {
    repoData.push({
      name: repo.name,
      owner: repo.owner.login,
      size: `${repo.size} KB`,
    });
  });
  return repoData;
};

export const fetchRepoDetails = async (username, accessToken, repoName) => {
  const repoDetails = await fetchRepoDetail(username, accessToken, repoName);

  const repoFilesResponse = await fetchRepoFiles(username, repoName);
  const tree = repoFilesResponse.tree;
  const files = tree.filter((node) => node.type === 'blob');

  const yamlFiles = tree.filter((file) => file.path.endsWith('.yml'));
  let yamlFileContent = null;
  if (yamlFiles.length > 0) {
    const yamlFileContentResponse = await fetchFileContent(yamlFiles[0].url);
    yamlFileContent = yamlFileContentResponse?.content;
  }

  const webhooksResponse = await fetchRepoHooks(username, repoName);
  const activeWebhooks = webhooksResponse?.length;

  return {
    name: repoDetails.name,
    owner: repoDetails.owner.login,
    size: `${repoDetails.size} KB`,
    privacy: `${repoDetails.private ? 'Private' : 'Public'}`,
    numberOfFiles: files.length,
    yamlFileContent: yamlFileContent
      ? `${Buffer.from(yamlFileContent, 'base64').toString('utf-8')}`
      : '',
    activeWebhooks,
  };
};
