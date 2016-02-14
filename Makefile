BIN = ./node_modules/.bin

.PHONY: bootstrap lint test test-watch

bootstrap:
	@npm install

lint:
	@$(BIN)/standard

test: lint
	@$(BIN)/mocha -R spec test/tests.js

test-watch: lint
	@$(BIN)/mocha -w -R spec test/tests.js

publish:
	@npm publish