SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
ORG_FILE = $(pim)/orgs/ellis_island.org
JS_FILES = $(shell ls js/*.js | grep -v all.js)
SINGLE_JS = js/all.js

.PHONY: publish build server javascript

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
publish: dev_js_to_all_js
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- Makefile' --filter='- README.md' \
	    $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;

build:	js/all.js
	bundle exec jekyll build

dev_js_to_all_js: build
	find _site -name '*.html' -print0 | xargs -0 sed -i '' '/START DEVELOPMENT/,/END DEVELOPMENT/{//d;d;}'
	find _site -name '*.html' -print0 | xargs -0 sed -i '' -e 's/<!-- ALL //' -e 's/ ALL -->//'

server:	js/all.js
	bundle exec jekyll server

javascript: $(SINGLE_JS)

feed:
	@curl --silent 'https://www.bandhelper.com/feed/calendar/64519?range=9' | jq

$(SINGLE_JS): $(JS_FILES)
	cat $^ > $@
