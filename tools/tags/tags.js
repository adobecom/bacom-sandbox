import DA_SDK from 'https://da.live/nx/utils/sdk.js';
import './tag-browser.js';

async function getAemRepo(project, opts) {
  const daEnv = project.env === 'stage' ? 'stage-' : '';
  const configUrl = `https://${daEnv}admin.da.live/config/${project.org}/${project.repo}`;
  const resp = await fetch(configUrl, opts);
  if (!resp.ok) return null;
  const json = await resp.json();
  const { value: repoId } = json.data.find((entry) => entry.key === 'aem.repositoryId');
  if (repoId) return repoId;
  return null;
}

(async function init() {
  const { project, token } = await DA_SDK;
  if (!project && !token) return;
  const opts = { headers: { Authorization: `Bearer ${token}` } };
  const aemRepo = await getAemRepo(project, opts);
  if (!aemRepo) return;
  const daTagBrowser = document.createElement('da-tag-browser');
  daTagBrowser.aemRepo = aemRepo;
  daTagBrowser.token = token;
  document.body.querySelector('main').append(daTagBrowser);
}());
