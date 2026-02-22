# 🛠️ Setup Guide - Awesome N8N

## Prerequisites

Before you start, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- A **GitHub account** (for deployment)

### Check Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v8.0.0 or higher
git --version   # Should be v2.25.0 or higher
```

## Step 1: Clone the Repository

```bash
# Using HTTPS (recommended)
git clone https://github.com/sudosuraj/awesome-n8n.git
cd awesome-n8n

# OR using SSH (if you have SSH keys set up)
git clone git@github.com:sudosuraj/awesome-n8n.git
cd awesome-n8n
```

## Step 2: Install Dependencies

```bash
npm install
```

This will:
- Download all packages from npm
- Create `node_modules/` directory
- Create `package-lock.json` file

⏱️ **Takes ~2-3 minutes on first install**

## Step 3: Run Development Server

```bash
npm run dev
```

Output will show:
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
```

✅ Open [http://localhost:3000](http://localhost:3000) in your browser

## Step 4: Explore the App

You should see:
- Hero section with title
- Search bar
- Sidebar with filters
- Template cards in a grid
- Loading spinner while fetching templates

## 📁 Project Structure Breakdown

### Core Files

**`app/`** - Next.js app directory
- `layout.tsx` - Root layout wrapping all pages
- `page.tsx` - Home page (main component)
- `globals.css` - Global styles
- `api/templates/route.ts` - API endpoint

**`components/`** - React components
- `Header.tsx` - Navigation bar
- `SearchBar.tsx` - Search input
- `FilterPanel.tsx` - Sidebar filters
- `TemplateCard.tsx` - Individual template card
- `TemplateGrid.tsx` - Grid layout
- `ThemeToggle.tsx` - Dark/light mode button

**`lib/`** - Utilities and helpers
- `api.ts` - GitHub API integration
- `store.ts` - State management (Zustand)
- `utils.ts` - Helper functions

**`types/`** - TypeScript definitions
- `index.ts` - All type interfaces

### Config Files

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `next.config.js` - Next.js configuration
- `.gitignore` - Files to ignore in Git

## 🔧 Common Commands

### Development
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Run production build
npm run lint      # Check code quality
```

### Project Files
```bash
# View file structure
tree -L 2

# Count lines of code
find . -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

## 🎨 Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```javascript
// Current: Sky blue accent
accent: {
  600: '#0284c7',
  // Change to any color you want
}
```

### Change Template Source

Edit `lib/api.ts`:

```typescript
const REPO_OWNER = 'enescingoz';
const REPO_NAME = 'awesome-n8n-templates';
// Change to your repo!
```

### Add Logo/Branding

Edit `components/Header.tsx`:

```tsx
<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600">
  {/* Replace with your logo */}
  <span className="text-white font-bold text-lg">n8</span>
</div>
```

## 📦 Key Dependencies

### React & Next.js
- `react` & `react-dom` - UI library
- `next` - React framework

### Styling
- `tailwindcss` - Utility-first CSS
- `postcss` - CSS processor

### State Management
- `zustand` - Lightweight state management

### API
- `axios` - HTTP client
- `fuse.js` - Fuzzy search

### Utilities
- `clsx` - Class name utility
- `markdown-it` - Markdown parser

## 🧪 Testing

### Manual Testing Checklist

- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] Dark mode toggles
- [ ] Favorite button works
- [ ] Copy URL button works
- [ ] Links open in new tabs
- [ ] Mobile responsive
- [ ] No console errors

### Test Search

```bash
1. Type "slack" in search
2. Should show slack-related templates
3. Filters should update count
```

### Test Filters

```bash
1. Select a category
2. Results should filter
3. Click "Reset Filters"
4. All templates should show again
```

## 🐛 Debugging

### Enable Debug Mode

Add to any component:
```typescript
console.log('store:', useTemplateStore());
console.log('filters:', filters);
```

### View Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "templates" API
4. Check response

### Check Template Data

In browser console:
```javascript
fetch('/api/templates').then(r => r.json()).then(console.log)
```

## 📚 Learning Resources

**Next.js**
- [Next.js Docs](https://nextjs.org/docs)
- [Next.js Tutorial](https://nextjs.org/learn)

**React**
- [React Docs](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react)

**Tailwind CSS**
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

**TypeScript**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React + TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)

## 🚀 Next Steps

1. **Understand the Code**
   - Start with `app/page.tsx`
   - Then check `components/`
   - Explore `lib/api.ts`

2. **Make Changes**
   - Update colors in `tailwind.config.js`
   - Modify template source in `lib/api.ts`
   - Add new components in `components/`

3. **Test Locally**
   - Run `npm run dev`
   - Check all features work
   - Test on mobile (DevTools)

4. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Push to GitHub
   - Connect to Vercel

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts the server
- [ ] App loads at `http://localhost:3000`
- [ ] No red errors in console
- [ ] Templates are displayed
- [ ] Search works
- [ ] Dark mode works
- [ ] Responsive on mobile

## 🆘 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### npm install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript Errors

```bash
# Check for type errors
npm run build

# Fix common issues
npm install --save-dev typescript@latest
```

### Templates Not Loading

1. Check API endpoint: `http://localhost:3000/api/templates`
2. Verify GitHub repo exists and is public
3. Check `lib/api.ts` for correct repo URL

## 📞 Need Help?

1. **Check Documentation** - See README.md
2. **Check Docs** - See DEPLOYMENT.md
3. **Search Issues** - GitHub Issues
4. **Create an Issue** - Describe the problem

---

Happy coding! 🎉
