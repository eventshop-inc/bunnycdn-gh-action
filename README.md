# bunnycdn-gh-action

This action deploys selected directory to BunnyCDN storage. 


## Upload and purge pull zone
````
- name: Deploy to BunnyCDN
  uses: Snider/bunnycdn-gh-action@v2.0.1
  with:
    source: "dist"
    storageZoneName: "myzone"
    accessKey: "${{ secrets.BUNNY_CDN_STORAGE_KEY }}"
    zoneId: "${{ secrets.BUNNY_CDN_PULL_ZONE_ID }}"
    zoneKey: "${{ secrets.BUNNY_CDN_ZONE_KEY }}"
````

## Upload 
````
- name: Upload to BunnyCDN
  uses: Snider/bunnycdn-gh-action@v2.0.1
  with:
    source: "dist"
    storageZoneName: "myzone"
    accessKey: "${{ secrets.BUNNY_CDN_STORAGE_KEY }}"
````

##  purge pull zone
````
- name: Purge BunnyCDN
  uses: Snider/bunnycdn-gh-action@v2.0.1
  with:
    zoneId: "${{ secrets.BUNNY_CDN_PULL_ZONE_ID }}"
    zoneKey: "${{ secrets.BUNNY_CDN_ZONE_KEY }}"
````
