import fs from "fs";
import fetch from "node-fetch";
import readdirp from "readdirp";
import { info } from "@actions/core";

function uploadFile(entry: readdirp.EntryInfo, storageZoneName: string, accessKey: string) {
  const readStream = fs.createReadStream(entry.fullPath);
  const REGION = "ny";
  const BASE_HOSTNAME = "storage.bunnycdn.com";
  const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
  const url = `https://${HOSTNAME}/${storageZoneName}/${entry.path}`;

  info(`Deploying ${entry.path} to ${url} with AccessKey ${accessKey} and Storage Zone Name ${storageZoneName}`);
  return fetch(`https://${HOSTNAME}/${storageZoneName}/${entry.path}`, {
    method: "PUT",
    headers: {
      "AccessKey": accessKey
    },
    body: readStream
  }).then(response => {
    if (response.status === 201) {
      info(`Successfull deployment of ${entry.path}`);
    } else {
      throw new Error(`Uploading ${entry.path} has failed with status code ${response.status}.`);
    }
    return response;
  });
}

export default async function run(path: string, storageZoneName: string, accessKey: string): Promise<void> {
  for await (const entry of readdirp(path)) {
    await uploadFile(entry, storageZoneName, accessKey);
  }
}
