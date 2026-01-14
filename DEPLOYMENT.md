# Vercel Deployment Guide for SASA Travel App

## Prerequisites

1. **GitHub/GitLab/Bitbucket account** with your repository pushed
2. **Vercel account** (sign up at vercel.com)
3. **WhatsApp phone number** for the contact form

---

## Step 1: Push Your Code to Git

```bash
# Add vercel.json to git
git add vercel.json
git commit -m "Add Vercel configuration"

# Push to your remote repository
git push origin main
```

---

## Step 2: Connect to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Configure the project:

   | Setting | Value |
   |---------|-------|
   | Framework Preset | `Vite` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow interactive prompts)
vercel
```

---

## Step 3: Configure Environment Variables

In your Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `WHATSAPP_PHONE_NUMBER` | Your WhatsApp number with country code (e.g., `15551234567`) | Production, Preview, Development |

3. Click **Save**

---

## Step 4: API Endpoint

Your WhatsApp API is automatically deployed at:

```
POST https://your-project.vercel.app/api/whatsapp
```

The frontend should call this endpoint for form submissions.

---

## Step 5: Update Frontend API URL (If Needed)

In your React components, ensure the API calls point to the correct URL:

```javascript
// Use relative path - Vercel handles routing automatically
const response = await fetch('/api/whatsapp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## Step 6: Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `sasatravel.com`)
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (up to 24-48 hours)

---

## Step 7: Deploy Updates

Simply push to your main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel automatically builds and deploys.

---

## Important Notes

### Build Output
- Static files are served from the `dist` folder
- API routes are serverless functions (cold starts may occur)
- Rate limiting works per function invocation

### Rate Limiting
- Current: 10 requests per minute per IP
- Note: Rate limit store resets on cold start in serverless environment
- For production, consider using Redis for persistent rate limiting

### CORS
- CORS is configured to allow your Vercel domain
- Update `server.js` if you need additional domains

---

## Troubleshooting

### Build Fails
```bash
# Test build locally
npm run build
```

### API Returns 500
- Check `WHATSAPP_PHONE_NUMBER` is set in Vercel dashboard
- Ensure phone number includes country code (no + or dashes)

### Static Assets Not Loading
- Verify `base: './'` in vite.config.js
- Check browser console for 404 errors

### Contact Form Not Working
- Check browser network tab for API errors
- Verify CORS settings in server.js
- Ensure rate limit not exceeded (429 error)

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `WHATSAPP_PHONE_NUMBER` | Yes | WhatsApp number with country code (digits only) |
| `FRONTEND_URL` | No | Your production URL for CORS (auto-detected) |
| `NODE_ENV` | No | Set to 'production' by Vercel |

---

## Performance Tips

1. **Images**: Optimize images before adding to `src/assets`
2. **Bundle Size**: Run `npm run build` to see chunk sizes
3. **CDN**: Vercel automatically serves assets via edge network
4. **Caching**: Static assets are cached automatically

