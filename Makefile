SRC = _site/
WEB_USER = jimm
WEB_SERVER = jimm.opalstacked.com
WEB_DIR = apps/ellis-island
ORG_FILE = $(pim)/orgs/ellis_island.org

.PHONY: publish build server

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
publish: build
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- bin' --filter='- Makefile' --filter='- README.md' \
	    $(SRC) $(WEB_SERVER):$(WEB_DIR)
	ssh $(WEB_USER)@$(WEB_SERVER) find $(WEB_DIR) -type d -exec chmod 755 {} \\\;

build:	song-list.md
	jekyll build

server:	song-list.md
	jekyll server

song-list.md:	$(ORG_FILE)
	bin/extract-song-names.sh "$(ORG_FILE)" | sed -e 's/:old://' > /tmp/song-list.md && \
	    mv /tmp/song-list.md .
