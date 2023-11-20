import uploader from './uploader';
import purge from './purge';
import purgeUrl from './purgeUrl';
import { getInput, setFailed, info } from '@actions/core';
import { join } from 'path';
import { Utils } from '@technote-space/github-action-helper';

async function run() {
  try {
    const source = join(Utils.getWorkspace(), getInput('source'));
    const storageZoneName = getInput('storageZoneName');
    const accessKey = getInput('accessKey');
    const zoneId = getInput('zoneId');
    const url = getInput('url');
    const filename = getInput('filename');

    if(storageZoneName && accessKey && filename) {
      info(`Deploying ${source}`);
      await uploader(source, storageZoneName, filename, accessKey);
    }

    if(accessKey && zoneId) {
      info(`Purging ${source}`);
      await purge(zoneId, accessKey);
    }

    if(accessKey && url) {
      info(`Purging ${url}`);
      await purgeUrl(accessKey, url);
    }
  } catch (error) {
    setFailed(error);
  }
}

void run();
