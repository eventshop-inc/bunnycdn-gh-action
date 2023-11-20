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

  info(`Deploying ${entry.path}`);
  info(`URL: ${url}`)
  info(`AccessKey: ${accessKey}`)
  info(`Full path: ${entry.fullPath}`)
  info(`Storage Name: ${storageZoneName}`)
  return fetch(`https://${HOSTNAME}/${storageZoneName}/${entry.path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/octet-stream",
      "AccessKey": accessKey,
    },
    body: readStream
  }).then(response => {
    if (response.status === 201) {
      info(`Successfull deployment of ${entry.path}`);
    } else {
      throw new Error(`Uploading ${entry.path} has failed width status code ${response.status}.`);
    }
    return response;
  });
}

export default async function run(path: string, storageZoneName: string, accessKey: string): Promise<void> {
  for await (const entry of readdirp(path)) {
    await uploadFile(entry, storageZoneName, accessKey);
  }
}
