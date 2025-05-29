# GitHub Pages Deployment Troubleshooting

## Current Error
```
remote: Permission to EmreYesilkaya/UDH.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/EmreYesilkaya/UDH.git/': The requested URL returned error: 403
```

## Solution Steps

### Method 1: GitHub Actions (Recommended)
1. Go to your repository: https://github.com/EmreYesilkaya/UDH
2. Go to **Settings** > **Pages**
3. Under "Source", select **"GitHub Actions"** (NOT "Deploy from a branch")
4. The workflow should run automatically on next push

### Method 2: Personal Access Token (If Method 1 fails)
1. Create a Personal Access Token:
   - Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   - Generate new token with `repo` and `workflow` permissions
2. Add the token to repository secrets:
   - Repository Settings > Secrets and variables > Actions
   - Add new secret named `PERSONAL_TOKEN` with your token value
3. Enable backup workflow:
   - Rename `deploy-backup.yml.disabled` to `deploy-backup.yml`
   - Disable main workflow by renaming `deploy.yml` to `deploy.yml.disabled`

### Method 3: Manual Pages Setup
1. Go to **Settings** > **Pages**
2. Select "Deploy from a branch"
3. Choose `main` branch and `/ (root)` folder
4. Save settings

## Expected Result
- Site will be available at: https://emreyesilkaya.github.io/UDH/
- Automatic deployment on every push to main branch

## Files Structure
```
.github/workflows/
├── deploy.yml                    # Main GitHub Actions workflow
└── deploy-backup.yml.disabled    # Backup peaceiris workflow (disabled)
```
