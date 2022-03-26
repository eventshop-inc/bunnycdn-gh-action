import uploader from './uploader';
import purge from './purge';
import { getInput, setFailed, info } from '@actions/core';
import { join } from 'path';
import { Utils } from '@technote-space/github-action-helper';


async function run() {
  try {
    const source = join(Utils.getWorkspace(), getInput('source'));
    const storageZoneName = getInput('storageZoneName');
    const accessKey = getInput('accessKey');
    const zoneId = getInput('zoneId');
    const zoneKey = getInput('zoneKey');


    if(storageZoneName && accessKey) {
      info(`Deploying ${source}`);
      await uploader(source, storageZoneName, accessKey);
    }

    if(zoneId && zoneKey) {
      info(`Purging ${source}`);
      await purge(zoneId, zoneKey);
    }


  } catch (error) {
    setFailed(error);
  }
}

void run();
