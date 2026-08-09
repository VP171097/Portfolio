# CI/CD & GitHub Pages

Workflows:
- `.github/workflows/ci.yml` — runs lint/test/build on PRs and pushes to dev/main.
- `.github/workflows/cd.yml` — builds and deploys the site to GitHub Pages on push to main.

Defaults:
- Production branch: main
- Build command: `npm run build`
- Publish folder: `./dist`

## Web3Forms Configuration for Contact Form

The contact section uses **Web3Forms** to send form submissions directly to your email.

### 1. Local Setup
Copy `.env.example` to `.env` and set your Web3Forms access key:
```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

### 2. Production Setup (GitHub Pages)
1. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
2. Add the **Repository Secret**:
   - `VITE_WEB3FORMS_ACCESS_KEY`
3. Trigger a push to `main` (or re-run the `CD` workflow). The secret will automatically be injected during the build.


