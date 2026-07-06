# CI/CD & GitHub Pages

Workflows:
- .github/workflows/ci.yml — runs lint/test/build on PRs and pushes to dev/main.
- .github/workflows/deploy-gh-pages.yml — builds and deploys the site to GitHub Pages on push to main.

Defaults:
- Production branch: main
- Build command: npm run build
- Publish folder: ./dist

Notes:
- No repository secrets required for the GitHub Pages deploy using the official actions.
- Ensure repository settings allow GitHub Actions to create Pages deployments (organization or repo policy may limit this).
- If your build outputs to a different folder (e.g., ./dist), change the path in both workflows accordingly.
