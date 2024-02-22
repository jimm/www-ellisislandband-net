SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
JS_FILES = $(shell ls js/*.js | grep -v all.js)
SINGLE_JS = js/all.js

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
.PHONY: publish ## Build the site and upload it (feeds not refreshed)
publish: dev-js-to-all-js install-feed-script
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- Makefile' --filter='- README.md' --filter='- scripts' \
	    $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;

.PHONY: server
server:	javascript		## Run the Jekyl server
	bundle exec jekyll server --livereload-ignore "scripts/*"

.PHONY: build
build:	javascript		## Build the site using Jekyll
	bundle exec jekyll build

.PHONY: dev-js-to-all-js
dev-js-to-all-js: build		## Make HTML files use all.js
	find _site -name '*.html' -print0 | xargs -0 sed -i '' '/START DEVELOPMENT/,/END DEVELOPMENT/{//d;d;}'
	find _site -name '*.html' -print0 | xargs -0 sed -i '' -e 's/<!-- ALL //' -e 's/ ALL -->//'

.PHONY: install-feed-script
install-feed-script:		## Upload the cron feed script
	scp scripts/fetch-ellisislandrock-json.sh $(WEB_USER)@$(WEB_SERVER):bin/fetch-ellisislandrock-json.sh
	ssh $(WEB_USER)@$(WEB_SERVER) chmod +x bin/fetch-ellisislandrock-json.sh

.PHONY: refresh-feeds
refresh-feeds: install-feed-script ## Refresh the remote JSON feed files
	ssh $(WEB_USER)@$(WEB_SERVER) bin/fetch-ellisislandrock-json.sh

.PHONY: refresh-local-feeds
refresh-local-feeds:		## Refresh the local JSON feed files
	scripts/fetch-ellisislandrock-json.sh .

.PHONY: javascript
javascript: $(SINGLE_JS)	## Build all.js from separate JS files

$(SINGLE_JS): $(JS_FILES)
	cat $^ > $@

.PHONY: help
help: ## Show this help message
	@echo 'Usage:'
	@echo '  make [target] ...'
	@echo
	@echo 'Targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'
