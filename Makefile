.DEFAULT_GOAL := help

ROBOTS_DIR := example/public/robots

.PHONY: dev build build-site preview lint clean robots-update robots-validate deploy hooks help

help:
	@echo ""
	@echo "\033[2m# Development\033[0m"
	@echo "  \033[36mdev\033[0m             Start Vite dev server (example app)"
	@echo ""
	@echo "\033[2m# Build\033[0m"
	@echo "  \033[36mbuild\033[0m           Build the npm library (dist/)"
	@echo "  \033[36mbuild-site\033[0m      Build the demo site (docs/)"
	@echo "  \033[36mpreview\033[0m         Preview the built library locally"
	@echo ""
	@echo "\033[2m# Quality\033[0m"
	@echo "  \033[36mlint\033[0m            Type-check with tsc"
	@echo "  \033[36mclean\033[0m           Remove dist/, docs/, node_modules/"
	@echo ""
	@echo "\033[2m# Robots submodule\033[0m"
	@echo "  \033[36mrobots-update\033[0m   Pull latest from urdf/robots submodule"
	@echo "  \033[36mrobots-validate\033[0m Validate robots catalog and paths"
	@echo "  \033[36mdeploy\033[0m          robots-update → robots-validate → lint → build-site"
	@echo ""
	@echo "\033[2m# Setup\033[0m"
	@echo "  \033[36mhooks\033[0m           Install git hooks (pre-commit lint, post-merge submodule sync)"
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

preview:
	npm run preview

lint:
	npm run lint

clean:
	rm -rf dist docs node_modules

robots-update:
	git -C $(ROBOTS_DIR) pull origin main

robots-validate:
	$(MAKE) -C $(ROBOTS_DIR) validate

deploy: robots-update robots-validate lint build-site

hooks:
	git config core.hooksPath .githooks
	@echo "Git hooks configured."
