import fs from "fs";
import fetch from "node-fetch";
import readdirp from "readdirp";
import { info } from "@actions/core";

function uploadFile(entry: readdirp.EntryInfo, storageName: string, filename: string, accessKey: string) {
  const readStream = fs.createReadStream(entry.fullPath);
  const REGION = "ny";
  const BASE_HOSTNAME = "storage.bunnycdn.com";
  const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;

  info(`Deploying ${entry.path}`);
  return fetch(`https://${HOSTNAME}/${storageName}/${filename}`, {
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

export default async function run(path: string, storageName: string, filename: string, accessKey: string): Promise<void> {
  for await (const entry of readdirp(path)) {
    await uploadFile(entry, storageName, filename, accessKey);
  }
}
