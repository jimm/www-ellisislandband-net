alias b := build
alias p := publish
alias s := server
alias r := refresh-feeds
alias l := refresh-local-feeds

SRC := '_site/'
WEB_USER := 'jimm'
WEB_SERVER := 'jimm.opalstacked.com'
WEB_DIR := 'apps/ellis-island'
JSON_FILES := 'song-list.json schedule.json'
TIMESTAMP_FILE := '/tmp/band-site-timestamp.txt'
TIMESTAMP_SCRIPT := 'update-ellisislandrock-timestamp.sh'
FETCH_SCRIPT := 'fetch-ellisislandrock-json.sh'

# Build React bundles and HTML files
build:
  npm run build
  bundle exec jekyll build
  cd _site && rm -rf {{JSON_FILES}} Makefile .DS_Store .localized README.md scripts

# Build, upload, modify timestamps, refresh feeds
publish: build 
  # NOTE: do not use the `--del` rsync flag or otherwise delete any files on
  # the server. There are files there such as the `.well-known` directory
  # that should not be checked in here and should not be deleted there.
  rsync -qrlpt {{SRC}} {{WEB_SERVER}}:{{WEB_DIR}}
  ssh {{WEB_USER}}@{{WEB_SERVER}} find {{WEB_DIR}} -type d -exec chmod 755 {} \\\;
  scp scripts/* {{WEB_USER}}@{{WEB_SERVER}}:bin
  ssh {{WEB_USER}}@{{WEB_SERVER}} chmod +x bin/{{TIMESTAMP_SCRIPT}} bin/{{FETCH_SCRIPT}}
  ssh {{WEB_USER}}@{{WEB_SERVER}} bin/{{TIMESTAMP_SCRIPT}}
  ssh {{WEB_USER}}@{{WEB_SERVER}} bin/{{FETCH_SCRIPT}}

# Run the Jekyl server
server:
  npm run watch &
  bundle exec jekyll server --livereload-ignore "scripts/*"
  pkill 'npm run watch'

# Refresh the site's JSON feed files
refresh-feeds:
  ssh {{WEB_USER}}@{{WEB_SERVER}} bin/{{FETCH_SCRIPT}}

# Refresh the local JSON feed files
refresh-local-feeds:
  scripts/{{FETCH_SCRIPT}} .
