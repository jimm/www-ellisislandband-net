HOST = jimmenard.com
SRC = ellisislandband/
DEST = webapps/ellisislandband

.PHONY: publish

# NOTE: do not use the `--del` rsync flag or otherwise delete any files on
# the server. There are files there such as the `.well-known` directory
# that should not be checked in here and should not be deleted there.
publish:
	rsync -qrlpt --filter='exclude .DS_Store' $(SRC) $(HOST):$(DEST)
