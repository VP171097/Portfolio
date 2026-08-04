# CI/CD & GitHub Pages

Workflows:
- `.github/workflows/ci.yml` — runs lint/test/build on PRs and pushes to dev/main.
- `.github/workflows/cd.yml` — builds and deploys the site to GitHub Pages on push to main.

Defaults:
- Production branch: main
- Build command: `npm run build`
- Publish folder: `./dist`

## EmailJS Configuration for Contact Form

The contact section uses **EmailJS** to send form submissions to your email.

### 1. Local Setup
Copy `.env.example` to `.env` and fill in your EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 2. Production Setup (GitHub Pages)
To enable the contact form on your deployed site:
1. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
2. Add three **Repository Secrets**:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Trigger a push to `main` (or re-run the `CD` workflow). The secrets will automatically be injected during the build.

