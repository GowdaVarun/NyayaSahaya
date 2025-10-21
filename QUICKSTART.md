# 🚀 Quick Start Guide: Deploy NyayaSahaya to Production

This is a **5-minute guide** to get your production deployment live.

## ✅ Prerequisites
- [ ] GitHub account with push access to this repository
- [ ] Accounts on deployment platforms (Render, Streamlit Cloud, etc.)

## 📋 Quick Steps

### Step 1: Create the prod Branch (1 minute)

**Option A: GitHub UI** (Easiest)
1. Go to: https://github.com/GowdaVarun/NyayaSahaya
2. Click the branch dropdown (top-left)
3. Type "prod" in the field
4. Click "Create branch: prod from current-branch"
5. ✅ Done!

**Option B: Command Line**
```bash
git checkout -b prod
git push -u origin prod
```

### Step 2: Deploy Backend Services (10-30 minutes)

#### 2A. Deploy Chatbot API

**Using Render.com:**
1. Go to https://render.com → New → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd NyayaSahaya-bot && pip install -r requirements.txt`
   - **Start Command:** `cd NyayaSahaya-bot && uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Environment Variable:** `TOGETHER_API_KEY=your_api_key`
4. Deploy and copy the URL (e.g., `https://nyayasahaya-api.onrender.com`)

**Alternative Platforms:**
- Railway.app
- Heroku
- AWS Lambda

#### 2B. Deploy Document Generator

**Using Streamlit Cloud:**
1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `legal_document_generator/doc_generator.py`
6. Deploy and copy the URL (e.g., `https://nyayasahaya-docs.streamlit.app`)

#### 2C. Deploy Document Summariser

Deploy your summariser service to any platform and get the URL.

### Step 3: Update Production URLs (1 minute)

Edit `.env.production` with your actual URLs:

```bash
# Update these with your deployed URLs from Step 2
VITE_CHATBOT_API_URL=https://your-actual-api-url.com
VITE_DOC_GENERATOR_URL=https://your-actual-streamlit-url.com
VITE_DOC_SUMMARISER_URL=https://your-actual-summariser-url.com
```

Save and commit:
```bash
git add .env.production
git commit -m "Update production backend URLs"
git push origin prod
```

### Step 4: Verify Deployment (2 minutes)

1. Go to GitHub → Actions tab
2. Watch the "Deploy Production Build to GitHub Pages" workflow
3. Wait for ✅ success (usually 1-2 minutes)
4. Visit https://nyayasahayael.com
5. Test all features:
   - [ ] Home page loads
   - [ ] Chatbot works
   - [ ] Document Generator loads
   - [ ] Document Summariser redirects

## 🎉 That's It!

Your application is now live with full functionality!

## 🐛 Troubleshooting

### Workflow Fails
```bash
# Check the Actions tab for detailed logs
# Common issues:
- Missing dependencies → Check package.json
- Build errors → Run `npm run build` locally first
```

### Backend Not Connecting
```bash
# Check:
1. Backend services are running (visit URLs directly)
2. CORS is enabled in backend for your domain
3. URLs in .env.production are correct (no trailing slashes)
```

### 404 Errors
```bash
# Ensure:
1. GitHub Pages is enabled in repository settings
2. Source is set to "GitHub Actions"
3. prod branch exists and has been pushed
```

## 📚 Need More Details?

- **Full Deployment Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Branch Setup Help:** See [PROD_BRANCH_SETUP.md](./PROD_BRANCH_SETUP.md)
- **Complete Summary:** See [SETUP_COMPLETE.md](./SETUP_COMPLETE.md)
- **Implementation Details:** See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## 🔗 Quick Links

- **Repository:** https://github.com/GowdaVarun/NyayaSahaya
- **Live Site:** https://nyayasahayael.com
- **GitHub Actions:** https://github.com/GowdaVarun/NyayaSahaya/actions
- **Render Dashboard:** https://render.com
- **Streamlit Cloud:** https://streamlit.io/cloud

## 💡 Tips

- **Automatic Deploys:** Every push to `prod` triggers automatic deployment
- **Manual Deploy:** Use the "Run workflow" button in GitHub Actions
- **Rollback:** Just push previous version to `prod` branch
- **Monitoring:** Watch GitHub Actions for deployment status

## 🎯 Success Checklist

After completing all steps:
- [ ] prod branch created
- [ ] Chatbot API deployed and running
- [ ] Document Generator deployed and running
- [ ] Document Summariser deployed and running
- [ ] .env.production updated with real URLs
- [ ] GitHub Actions workflow completed successfully
- [ ] Website accessible at nyayasahayael.com
- [ ] Chatbot responds to queries
- [ ] Document Generator loads in iframe
- [ ] Document Summariser redirects correctly

---

**Estimated Total Time:** 15-45 minutes (depending on platform familiarity)

**Status Check:** Run `git branch -a` to verify prod branch exists
