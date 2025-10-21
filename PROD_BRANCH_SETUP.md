# Creating the Production (prod) Branch

This document explains how to create and set up the `prod` branch for production deployment.

## Steps to Create the prod Branch

Since the automated deployment configuration is ready on the current branch, you need to create the `prod` branch manually:

### Option 1: Via GitHub UI (Recommended)

1. Go to your repository on GitHub: https://github.com/GowdaVarun/NyayaSahaya
2. Click on the branch dropdown (currently shows your branch name)
3. Type "prod" in the search/create box
4. Click "Create branch: prod from [current-branch]"

### Option 2: Via Git Command Line

If you have push access, run these commands:

```bash
# Create and switch to prod branch
git checkout -b prod

# Push the prod branch to remote
git push -u origin prod
```

### Option 3: Via GitHub Actions

You can also create the branch through the GitHub Actions workflow:

1. Merge this PR to main
2. Create a new branch called `prod` from main
3. The deployment workflow will automatically trigger

## What Happens After Creating prod Branch?

Once the `prod` branch is created:

1. **Automatic Deployment**: Every push to the `prod` branch will trigger the GitHub Actions workflow
2. **Build Process**: The workflow will:
   - Install Node.js dependencies
   - Build the React/Vite application
   - Deploy to GitHub Pages
3. **Live Website**: The site will be available at your custom domain (nyayasahayael.com)

## Deployment Workflow Features

The `.github/workflows/deploy-prod.yml` workflow includes:

- ✅ Automatic build on push to `prod` branch
- ✅ Manual deployment trigger (workflow_dispatch)
- ✅ Node.js caching for faster builds
- ✅ Automatic CNAME file inclusion
- ✅ GitHub Pages deployment

## Environment Configuration

The application is configured with environment variables for backend services:

### Production URLs (in `.env.production`)
- **Chatbot API**: `https://nyayasahaya-api.onrender.com`
- **Document Generator**: `https://nyayasahaya-docs.streamlit.app`
- **Document Summariser**: `https://nyayasahaya-summariser.streamlit.app`

**Note**: These are placeholder URLs. Update them in `.env.production` with your actual deployed backend URLs.

## Backend Services Deployment

Before the frontend can fully function, deploy the backend services:

### 1. Deploy Chatbot API (FastAPI)
```bash
cd NyayaSahaya-bot
# Deploy to Render, Railway, or similar platform
# Update VITE_CHATBOT_API_URL in .env.production
```

### 2. Deploy Document Generator (Streamlit)
```bash
cd legal_document_generator
# Deploy to Streamlit Cloud
# Update VITE_DOC_GENERATOR_URL in .env.production
```

### 3. Configure Document Summariser
- Deploy or configure your document summariser service
- Update VITE_DOC_SUMMARISER_URL in .env.production

## Updating Production URLs

After deploying backend services:

1. Update `.env.production` with actual URLs
2. Commit and push to `prod` branch:
```bash
git add .env.production
git commit -m "Update production backend URLs"
git push origin prod
```
3. GitHub Actions will automatically rebuild and redeploy

## Verifying Deployment

After the workflow completes:

1. Check the Actions tab for deployment status
2. Visit your website: https://nyayasahayael.com
3. Test the chatbot functionality
4. Test the document generator
5. Test the document summariser

## Troubleshooting

### Workflow Not Triggering
- Ensure GitHub Pages is enabled in repository settings
- Check that the `prod` branch exists
- Verify workflow file is present in `.github/workflows/`

### Deployment Fails
- Check Actions tab for error logs
- Verify Node.js version compatibility
- Check for missing dependencies

### Backend Services Not Working
- Verify backend URLs in `.env.production`
- Check CORS configuration in backend services
- Ensure backend services are running

## Next Steps

1. ✅ Create `prod` branch (follow steps above)
2. ⏳ Deploy backend services
3. ⏳ Update `.env.production` with actual URLs
4. ⏳ Test full application functionality
5. ⏳ Monitor deployment and fix any issues

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
