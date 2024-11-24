SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
JS_FILES = $(shell ls js/*.js | grep -v all.js)
JSON_FILES = song-list.json schedule.json
ALL_JS = js/all.js
TIMESTAMP_FILE = /tmp/band-site-timestamp.txt
TS_SCRIPT = update-ellisislandrock-timestamp.sh
FETCH_SCRIPT = fetch-ellisislandrock-json.sh

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
.PHONY: publish
publish: build ## Build the site, upload it, modify timestamp, and refresh the feeds
	rsync -qrlpt $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;
	scp scripts/* $(WEB_USER)@$(WEB_SERVER):bin
	ssh $(WEB_USER)@$(WEB_SERVER) chmod +x bin/$(TS_SCRIPT) bin/$(FETCH_SCRIPT)
	ssh $(WEB_USER)@$(WEB_SERVER) bin/$(TS_SCRIPT)
	ssh $(WEB_USER)@$(WEB_SERVER) bin/$(FETCH_SCRIPT)

.PHONY: server
server:				## Run the Jekyl server
	bundle exec jekyll server --livereload-ignore "scripts/*"

.PHONY: build
build:	$(ALL_JS)		## Build all.js and the HTML files
	bundle exec jekyll build
	cd _site && rm -rf $(JSON_FILES) Makefile .DS_Store .localized README.md scripts
	find _site -name '*.html' -print0 | xargs -0 sed -i '' '/START DEVELOPMENT/,/END DEVELOPMENT/{//d;d;}'
	find _site -name '*.html' -print0 | xargs -0 sed -i '' -e 's/<!-- ALL //' -e 's/ ALL -->//'

.PHONY: refresh-local-feeds
refresh-local-feeds:		## Refresh the local JSON feed files
	scripts/$(FETCH_SCRIPT) .

$(ALL_JS): $(JS_FILES)		## Build all.js from the other .js files
	cat $^ > $@

.PHONY: help
help: ## Show this help message
	@echo 'Usage:'
	@echo '  make [target] ...'
	@echo
	@echo 'Targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'
