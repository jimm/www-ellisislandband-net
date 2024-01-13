SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
ORG_FILE = $(pim)/orgs/ellis_island.org
JS_FILES = $(shell ls js/*.js | grep -v all.js)
SINGLE_JS = js/all.js

.PHONY: publish build server dev_js_to_all_js javascript local-json-data-files

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
publish: dev_js_to_all_js
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- Makefile' --filter='- README.md' --filter='- scripts' \
	    $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;
	scp scripts/fetch-ellisislandrock-json.sh $(WEB_USER)@$(WEB_SERVER):bin/fetch-ellisislandrock-json.sh
	ssh $(WEB_USER)@$(WEB_SERVER) chmod +x bin/fetch-ellisislandrock-json.sh
	ssh $(WEB_USER)@$(WEB_SERVER) bin/fetch-ellisislandrock-json.sh

build:	$(SINGLE_JS)
	bundle exec jekyll build

dev_js_to_all_js: build
	find _site -name '*.html' -print0 | xargs -0 sed -i '' '/START DEVELOPMENT/,/END DEVELOPMENT/{//d;d;}'
	find _site -name '*.html' -print0 | xargs -0 sed -i '' -e 's/<!-- ALL //' -e 's/ ALL -->//'

server:	$(SINGLE_JS) local-json-data-files
	bundle exec jekyll server --livereload-ignore "scripts/*"

javascript: $(SINGLE_JS)

local-json-data-files:
	scripts/fetch-ellisislandrock-json.sh .

$(SINGLE_JS): $(JS_FILES)
	cat $^ > $@
