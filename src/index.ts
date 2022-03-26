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
    const zoneId = getInput('zoneID');
    const zoneKey = getInput('zoneKey');
    info(`Deploying ${source}`);
    await uploader(source, storageZoneName, accessKey);
    if(zoneID){
      await purge(zoneID, zoneKey);
    }
  } catch (error) {
    setFailed(error);
  }
}

void run();
