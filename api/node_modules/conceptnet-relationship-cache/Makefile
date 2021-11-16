GETOFFSETS = node_modules/.bin/get-file-line-offsets-in-json 

test:
	node tests/concept-tests.js

pushall:
	git push origin master && npm publish

prettier:
	prettier --single-quote --write "**/*.js"

build-relmaps:
	node tools/make-relationship-maps.js data/conceptnet/conceptnet-assertions-5.6.0-subset.ndjson data/conceptnet

build-file-offsets: build-conceptnet-file-offsets
	node $(GETOFFSETS) data/categories.txt > data/categories-line-offsets.json
	node $(GETOFFSETS) data/parts-categories.txt > data/parts-categories-line-offsets.json

build-conceptnet-file-offsets:
	./build-conceptnet-file-offsets.sh

#save-part-of-relationships:
#	node tools/get-conceptnet-relationship.js PartOf > data/conceptnet/PartOf-relationships.json
#

data/conceptnet/conceptnet-assertions-5.6.0-subset.ndjson:
	# Assertions file can be downloaded from here: https://github.com/commonsense/conceptnet5/wiki/Downloads
	node tools/filter-conceptnet-csv.js ~/Downloads/conceptnet-assertions-5.6.0.csv > data/conceptnet/conceptnet-assertions-5.6.0-subset.ndjson

get-data-file-line-counts:
	cd data/conceptnet && find ./ -type f -name *.ndjson -exec wc -l {} +

