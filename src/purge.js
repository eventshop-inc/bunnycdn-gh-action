import fs from 'fs';
import fetch from 'node-fetch';
import readdirp from 'readdirp';
import { info } from '@actions/core';

function purgeZone(zoneID: string, accessKey: string) {
 
  return fetch(`https://storage.bunnycdn.com/api/pullzone/purgeCache?id=${entry.zoneID}`, {
    method: 'GET',
    headers: {
      "AccessKey": accessKey,
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

export default async function run( zoneID: string, accessKey: string): Promise<void> {
 
    await purgeZone( zoneID, accessKey);
  
}
