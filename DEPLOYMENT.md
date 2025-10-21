# Deployment Guide for NyayaSahaya

## Production Branch

The `prod` branch is configured for production deployment to GitHub Pages with full chatbot and document summariser functionality.

## Deployment Workflow

The project uses GitHub Actions for automated deployment. The workflow is triggered on:
- Push to `prod` branch
- Manual workflow dispatch

### Workflow Steps
1. Build the React/Vite application
2. Deploy to GitHub Pages
3. Site is available at the custom domain: nyayasahayael.com

## Backend Services Configuration

The application requires the following backend services to be deployed separately:

### 1. Chatbot API (FastAPI)
- Location: `/NyayaSahaya-bot/app.py`
- Environment variable: `VITE_CHATBOT_API_URL`
- Production URL: https://nyayasahaya-api.onrender.com (update as needed)

**Deployment Instructions:**
```bash
cd NyayaSahaya-bot
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

Recommended platforms:
- Render.com
- Railway.app
- Heroku
- AWS EC2/Lambda

### 2. Document Generator (Streamlit)
- Location: `/legal_document_generator/doc_generator.py`
- Environment variable: `VITE_DOC_GENERATOR_URL`
- Production URL: https://nyayasahaya-docs.streamlit.app (update as needed)

**Deployment Instructions:**
```bash
cd legal_document_generator
pip install -r requirements.txt
streamlit run doc_generator.py
```

Recommended platforms:
- Streamlit Cloud (streamlit.io/cloud)
- Render.com
- Heroku

### 3. Document Summariser
- Environment variable: `VITE_DOC_SUMMARISER_URL`
- Production URL: https://nyayasahaya-summariser.streamlit.app (update as needed)

## Environment Variables

### Development (.env)
```bash
VITE_CHATBOT_API_URL=http://localhost:8000
VITE_DOC_GENERATOR_URL=http://localhost:8501
VITE_DOC_SUMMARISER_URL=https://example.com
```

### Production (.env.production)
```bash
VITE_CHATBOT_API_URL=https://your-chatbot-api.com
VITE_DOC_GENERATOR_URL=https://your-doc-generator.com
VITE_DOC_SUMMARISER_URL=https://your-doc-summariser.com
```

## Updating Production URLs

1. Update the `.env.production` file with your deployed backend URLs
2. Commit and push to the `prod` branch
3. GitHub Actions will automatically rebuild and deploy

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Manual Deployment

If you need to manually deploy:

```bash
# Switch to prod branch
git checkout prod

# Build the project
npm run build

# The dist/ folder will be automatically deployed by GitHub Actions
```

## Custom Domain

The site is configured to use the custom domain: **nyayasahayael.com**

The CNAME file is automatically copied to the dist folder during build.

## Troubleshooting

### Backend Connection Issues
- Ensure backend services are running and accessible
- Check CORS configuration in backend services
- Verify environment variables are correctly set

### Build Failures
- Check Node.js version (recommended: 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for missing dependencies

### Deployment Issues
- Verify GitHub Pages is enabled in repository settings
- Check GitHub Actions logs for errors
- Ensure the prod branch has the latest changes

## Security Considerations

1. **API Keys**: Never commit API keys to the repository
2. **CORS**: Configure backend CORS to only allow your domain
3. **Environment Variables**: Use GitHub Secrets for sensitive data in CI/CD
4. **HTTPS**: Ensure all backend services use HTTPS in production

## Monitoring and Maintenance

- Monitor GitHub Actions for deployment status
- Check backend service health regularly
- Update dependencies periodically
- Review GitHub Pages deployment logs

## Support

For issues or questions, please create an issue in the GitHub repository.
