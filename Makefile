SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
JSON_FILES = song-list.json schedule.json
TIMESTAMP_FILE = /tmp/band-site-timestamp.txt
TIMESTAMP_SCRIPT = update-ellisislandrock-timestamp.sh
FETCH_SCRIPT = fetch-ellisislandrock-json.sh

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
.PHONY: publish
publish: build ## Build the site, upload it, modify timestamp, and refresh the feeds
	rsync -qrlpt $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;
	scp scripts/* $(WEB_USER)@$(WEB_SERVER):bin
	ssh $(WEB_USER)@$(WEB_SERVER) chmod +x bin/$(TIMESTAMP_SCRIPT) bin/$(FETCH_SCRIPT)
	ssh $(WEB_USER)@$(WEB_SERVER) bin/$(TIMESTAMP_SCRIPT)
	ssh $(WEB_USER)@$(WEB_SERVER) bin/$(FETCH_SCRIPT)

.PHONY: server
server:				## Run the Jekyl server
	npm run build
	bundle exec jekyll server --livereload-ignore "scripts/*"

.PHONY: build
build:				## Build React bundles and HTML files
	npm run build
	bundle exec jekyll build
	cd _site && rm -rf $(JSON_FILES) Makefile .DS_Store .localized README.md scripts

.PHONY: refresh-feeds
refresh-feeds:			## Refresh the site's JSON feed files
	ssh $(WEB_USER)@$(WEB_SERVER) bin/$(FETCH_SCRIPT)

.PHONY: refresh-local-feeds
refresh-local-feeds:		## Refresh the local JSON feed files
	scripts/$(FETCH_SCRIPT) .

.PHONY: help
help: ## Show this help message
	@echo 'Usage:'
	@echo '  make [target] ...'
	@echo
	@echo 'Targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'
