for relmapfile in data/conceptnet/*-relmaps.ndjson
do
  nameroot=$(basename -- "$relmapfile")
  nameroot="${nameroot%.*}"
  node node_modules/.bin/get-file-line-offsets-in-json "$relmapfile" > "data/conceptnet/$nameroot-offsets.json"
done

