# 🚀 Deployment Guide - Awesome N8N

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps. No configuration needed!

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd awesome-n8n
vercel
```

### Option 2: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/sudosuraj/awesome-n8n.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"
   - Vercel will automatically detect Next.js and configure it
   - Click "Deploy"

3. **Custom Domain**
   - After deployment, go to Project Settings → Domains
   - Add your custom domain (e.g., `awesome-n8n.vercel.app`)
   - Update DNS records if needed

## Custom Domain Setup

### Using awesome-n8n.vercel.app

1. Deploy to Vercel (see above)
2. Your app will automatically get the `awesome-n8n.vercel.app` domain
3. No additional configuration needed!

### Using Custom Domain

1. In Vercel dashboard: Settings → Domains
2. Add your domain
3. Update DNS records (Vercel will show you how)

## Environment Variables

Currently no environment variables are needed. For future use:

1. In Vercel dashboard: Settings → Environment Variables
2. Add variables (e.g., `GITHUB_TOKEN`)
3. Redeploy

## Auto-Deployment from GitHub

Once connected, every push to `main` branch will automatically:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy to production

To preview before deploying, open a pull request - Vercel creates preview deployments.

## Build & Deployment Logs

View in Vercel dashboard:
- Deployments tab: See all deployments and their status
- Builds: View build logs if something fails
- Settings: Configure auto-deployments

## Performance Optimization

### Current Configuration

- **ISR (Incremental Static Regeneration)**: Templates API revalidates every 1 hour
- **Edge Caching**: Vercel automatically caches responses
- **Image Optimization**: Next.js image optimization enabled
- **Code Splitting**: Automatic code splitting for faster loads

### Monitoring

- **Speed Insights**: Vercel shows Web Vitals automatically
- **Analytics**: Track pageviews and user metrics
- **Error Tracking**: Sentry integration available (optional)

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all dependencies in `package.json`
3. Check for TypeScript errors: `npm run build` locally

### API Not Working

1. Verify GitHub repo URL in `lib/api.ts`
2. Check API rate limits (GitHub allows 60 requests/hour unauthenticated)
3. Add `GITHUB_TOKEN` env var for 5,000 requests/hour

### Dark Mode Not Working

1. Clear browser cache
2. Check localStorage: `localStorage.getItem('darkMode')`
3. Ensure JavaScript is enabled

## Scaling Up

### If Traffic Increases

1. **Add GitHub Token** for higher API limits
   - Create personal access token on GitHub
   - Add to Vercel env vars as `GITHUB_TOKEN`

2. **Enable Caching**
   - Currently caches for 1 hour
   - Increase in `app/api/templates/route.ts`

3. **Upgrade Plan**
   - Vercel offers paid plans for production apps
   - Includes priority support and higher limits

## Local Testing

Before deploying, test locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` and verify everything works.

## Rollback

If something breaks:

1. Vercel dashboard → Deployments
2. Find previous good deployment
3. Click "..." → "Promote to Production"

## Monitoring & Analytics

### Set Up Analytics

1. Vercel dashboard → Project Settings → Analytics
2. Enable Web Analytics
3. View real-time traffic and metrics

### Set Up Error Tracking (Optional)

1. Install Sentry integration
2. Get data about JavaScript errors
3. Get alerts on critical errors

## Cost

**Vercel Free Plan Includes:**
- Unlimited deployments
- Unlimited bandwidth
- Serverless functions (limited)
- Custom domains

**Perfect for this project!** No costs for normal usage.

## Next Steps

1. Push to GitHub
2. Connect to Vercel
3. Visit your deployed app
4. Update GitHub repo with live URL
5. Share with the community! 🚀

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Post questions in your repo
