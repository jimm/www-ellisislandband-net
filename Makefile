HOST = jimmenard.com
SRC = _site/
DEST = webapps/ellisislandband

.PHONY: publish bild server

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
publish: build
	rsync -qrlpt --filter='- .DS_Store' --filter='- .localized' \
	    $(SRC) $(HOST):$(DEST)

build:
	jekyll build

server:
	jekyll server
