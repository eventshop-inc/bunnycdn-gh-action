import fetch from "node-fetch";
import { info } from "@actions/core";

function purgeUrl(zoneKey: string, url: string) {
  const encodedUrl = encodeURI(url);
  return fetch(`https://api.bunny.net/purge?url=${encodedUrl}`, {
    method: "POST",
    headers: {
      "AccessKey": zoneKey,
    }
  }).then(response => {
    if (response.status === 200) {
      info("URL successfuly purged");
    } else if (response.status === 401) {
      info("The request authorization failed");
    } else {
      throw new Error(`Error purging cache ${response.status}.`);
    }
    return response;
  });
}

export default async function run(zoneKey: string, url: string): Promise<void> {
  await purgeUrl(zoneKey, url);
}
