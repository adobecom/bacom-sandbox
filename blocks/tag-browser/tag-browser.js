import nxApp from './nx-shell.js';

const TAG_PATH = '/content/cq:tags.infinity.json';

async function getAemRepo(project, opts) {
  const configUrl = `https://admin.da.live/config/${project.org}/${project.repo}/`;
  const resp = await fetch(configUrl, opts);
  if (!resp.ok) return null;
  const json = await resp.json();
  const { value: repoId } = json.data.find((entry) => entry.key === 'aem.repositoryId');
  if (repoId) return repoId;
  return null;
}

async function getTags(aemRepo, opts) {
  const resp = await fetch(`https://${aemRepo}${TAG_PATH}`, opts);
  if (!resp.ok) return null;
  const json = await resp.json();
  return json;
}

export default async function init(el) {
  const { token, project } = await nxApp(el);
  const opts = { headers: { Authorization: `Bearer ${token}` } };
  const aemRepo = await getAemRepo(project, opts);
  const tags = await getTags(aemRepo, opts);
  console.log(tags);
}
