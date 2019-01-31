.PHONY: publish
publish:
	scp -r ellisislandband/ jimm:webapps
	ssh jimm rm -f webapps/ellisisland/.DS_Store
