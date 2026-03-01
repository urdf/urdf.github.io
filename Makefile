.DEFAULT_GOAL := help

.PHONY: dev build build-site lint clean help

help:
	@echo ""
	@echo "\033[2m# Development\033[0m"
	@echo "  \033[36mdev\033[0m          Start Vite dev server (example app)"
	@echo ""
	@echo "\033[2m# Build\033[0m"
	@echo "  \033[36mbuild\033[0m        Build the npm library (dist/)"
	@echo "  \033[36mbuild-site\033[0m   Build the demo site (docs/)"
	@echo ""
	@echo "\033[2m# Quality\033[0m"
	@echo "  \033[36mlint\033[0m         Type-check with tsc"
	@echo "  \033[36mclean\033[0m        Remove dist/, docs/, node_modules/"
	@echo ""

dev:
	npm install
	npm run dev

build:
	npm install
	npm run build
	@printf "\n\033[1;36m  Library built to dist/\033[0m\n\n"

build-site:
	npm install
	npm run build:site
	@printf "\n\033[1;36m  Demo site built to docs/\033[0m\n\n"

lint:
	npm run lint

clean:
	rm -rf dist docs node_modules
