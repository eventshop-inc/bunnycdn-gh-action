import fs from 'fs';
import fetch from 'node-fetch';
import readdirp from 'readdirp';
import { info } from '@actions/core';

function purgeZone(zoneID: string, zoneKey: string) {
 
  return fetch(`https://api.bunny.net/pullzone/${zoneID}/purgeCache`, {
    method: 'POST',
    headers: {
      "AccessKey": zoneKey,
    },
    body: readStream
  }).then(response => {
    if (response.status === 200) {
      info(`Cache puged`);
    } else {
      throw new Error(`Error purging cache ${response.status}.`);
    }
    return response;
  });
}

export default async function run( zoneID: string, zoneKey: string): Promise<void> {
 
    await purgeZone( zoneID, zoneKey);
  
}
