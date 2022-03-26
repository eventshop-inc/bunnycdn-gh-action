# bunnycdn-gh-action

This action deploys selected directory to BunnyCDN storage. 

## Inputs

### `source`

**Required** The source directory folder.

### `storageZoneName`

**Required** The name of your storage zone where you are connecting to.

### `apiKey`

**Required** The storage API key.

### `zoneID`

The connected PullZone id

### `zoneKey`

The token for the pull zone

## Example usage
````
- name: Deploy to BunnyCDN
  uses: Snider/bunnycdn-gh-action@master
  with:
    source: "dist"
    storageZoneName: "myzone"
    accessKey: "${{ secrets.BUNNY_CDN_STORAGE_KEY }}"
    zoneID: "${{ secrets.BUNNY_CDN_PULL_ZONE_ID }}"
    zoneKey: "${{ secrets.BUNNY_CDN_ZONE_KEY }}"
````
