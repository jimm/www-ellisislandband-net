SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
JS_FILES = $(shell ls js/*.js | grep -v all.js)
SINGLE_JS = js/all.js

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
.PHONY: publish
publish: dev-js-to-all-js install-feed-script
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- Makefile' --filter='- README.md' --filter='- scripts' \
	    $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;

.PHONY: build
build:	$(SINGLE_JS)
	bundle exec jekyll build

.PHONY: dev-js-to-all-js
dev-js-to-all-js: build
	find _site -name '*.html' -print0 | xargs -0 sed -i '' '/START DEVELOPMENT/,/END DEVELOPMENT/{//d;d;}'
	find _site -name '*.html' -print0 | xargs -0 sed -i '' -e 's/<!-- ALL //' -e 's/ ALL -->//'

.PHONY: install-feed-script
install-feed-script:
	scp scripts/fetch-ellisislandrock-json.sh $(WEB_USER)@$(WEB_SERVER):bin/fetch-ellisislandrock-json.sh
	ssh $(WEB_USER)@$(WEB_SERVER) chmod +x bin/fetch-ellisislandrock-json.sh

.PHONY: refresh-feeds
refresh-feeds: install-feed-script
	ssh $(WEB_USER)@$(WEB_SERVER) bin/fetch-ellisislandrock-json.sh

.PHONY: server
server:	$(SINGLE_JS) refresh-local-feeds
	bundle exec jekyll server --livereload-ignore "scripts/*"

.PHONY: refresh-local-feeds
refresh-local-feeds:
	scripts/fetch-ellisislandrock-json.sh .

.PHONY: javascript
javascript: $(SINGLE_JS)

$(SINGLE_JS): $(JS_FILES)
	cat $^ > $@
