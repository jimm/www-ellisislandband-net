HOST = jimmenard.com
SRC = _site/
DEST = webapps/ellisislandband
OPALHOST = jimm.opalstacked.com
OPALDEST = apps/ellis-island

.PHONY: publish build server opal

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
publish: build
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- bin' --filter='- Makefile' --filter='- README.md' \
	    $(SRC) $(HOST):$(DEST)

# While transferring from Webfaction to Opalstack, let's keep this a
# separate target.
opal: build
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    --filter='- bin' --filter='- Makefile' --filter='- README.md' \
	    $(SRC) $(OPALHOST):$(OPALDEST)

build:	schedule.md
	jekyll build

server:	schedule.md
	jekyll server

schedule.md:	$(pim)/orgs/music/ellis_island.org
	bin/extract-song-names.sh > /tmp/song-list.md && \
	    mv /tmp/song-list.md .
