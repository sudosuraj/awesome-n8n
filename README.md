# Awesome N8N

A beautiful, modern web interface for discovering and exploring N8N workflow templates. Built with React, Next.js, and Tailwind CSS.

## ✨ Features

- **🔍 Full-text Search** - Search across template titles, descriptions, and tags
- **🏷️ Smart Filtering** - Filter by category, tags, and sort by relevance, popularity, recency, or rating
- **⭐ Favorites** - Save your favorite templates for quick access
- **🌙 Dark Mode** - Beautiful dark and light themes with automatic preference detection
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Serverless** - Deploys seamlessly to Vercel with zero configuration
- **🔄 Dynamic Data** - Automatically fetches and caches templates from the community repository
- **🎨 Minimalist UI** - Clean, sophisticated design inspired by Claude/Anthropic aesthetics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sudosuraj/awesome-n8n.git
cd awesome-n8n

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using Vercel:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel dashboard for automatic deployments.

## 🏗️ Project Structure

```
awesome-n8n/
├── app/
│   ├── api/
│   │   └── templates/route.ts      # API endpoint for fetching templates
│   ├── globals.css                  # Global styles with Tailwind
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Home page
├── components/
│   ├── Header.tsx                   # Navigation header
│   ├── SearchBar.tsx                # Search input
│   ├── FilterPanel.tsx              # Sidebar filters
│   ├── TemplateCard.tsx             # Individual template card
│   ├── TemplateGrid.tsx             # Grid of templates
│   └── ThemeToggle.tsx              # Dark/light mode toggle
├── lib/
│   ├── api.ts                       # GitHub API integration
│   ├── store.ts                     # Zustand state management
│   └── utils.ts                     # Utility functions
├── types/
│   └── index.ts                     # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Customization

### Color Scheme

The app uses a sophisticated neutral color palette with accent colors. Modify in `tailwind.config.js`:

```javascript
colors: {
  neutral: { /* ... */ },
  accent: { /* Sky blue accent colors */ }
}
```

### Template Data Source

By default, templates are fetched from:
`https://raw.githubusercontent.com/enescingoz/awesome-n8n-templates/main/README.md`

To change the source, edit `lib/api.ts`:

```typescript
const REPO_OWNER = 'your-username';
const REPO_NAME = 'your-repo';
```

## 🔄 How It Works

1. **Fetch**: API endpoint fetches the latest templates from the target repository
2. **Parse**: Markdown content is parsed into structured template data
3. **Cache**: Results are cached for 1 hour to minimize API calls
4. **Search**: Client-side search filters results in real-time
5. **Display**: Templates are rendered as beautiful cards with metadata

## 🌐 API Endpoints

### GET `/api/templates`

Returns all templates and categories.

**Response:**
```json
{
  "success": true,
  "templates": [
    {
      "id": "template-1",
      "title": "Slack Notification",
      "description": "Send notifications to Slack",
      "category": "messaging",
      "tags": ["slack", "notification"],
      "author": { "name": "Community" },
      "source": { "url": "...", "type": "github" },
      "rating": 85,
      "downloads": 120,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    }
  ],
  "categories": [
    {
      "id": "messaging",
      "name": "Messaging",
      "count": 15
    }
  ]
}
```

## 📊 State Management

Uses Zustand for lightweight state management:

- **templates**: Array of all templates
- **favorites**: Set of favorited template IDs
- **filters**: Current search/filter state
- **isDarkMode**: Theme preference

```typescript
const { templates, favorites, filters, setFilters, toggleFavorite } = useTemplateStore();
```

## 🛠️ Development

### Add a New Feature

1. Create component in `components/`
2. Add types to `types/index.ts`
3. Update store in `lib/store.ts` if needed
4. Test in development mode

### Update Template Parser

The parser in `lib/api.ts` expects markdown format:

```markdown
## Category Name

- [Template Title](url) - Description of template
- [Another Template](url) - Description
```

## 🔐 Environment Variables

Currently, the app doesn't require any environment variables. GitHub API is called directly from serverless functions, which have rate limits but sufficient for most use cases.

For production deployments with higher API usage, consider:

```env
GITHUB_TOKEN=your_token_here
GITHUB_API_URL=https://api.github.com
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) - Original templates repository
- [N8N](https://n8n.io) - The awesome workflow automation platform
- [Vercel](https://vercel.com) - For seamless deployments

## 📝 Notes

### Data Freshness

Templates are cached for 1 hour. To force a refresh:

1. Deployment will reset cache
2. Clear browser cache to see UI updates
3. API cache can be configured in `app/api/templates/route.ts`

### Performance

- Client-side search for instant filtering
- ISR (Incremental Static Regeneration) for API routes
- Optimized images and lazy loading
- Minimal dependencies (~5 core packages)

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Bug Reports

Found a bug? Please create an issue on GitHub with:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information

## 📧 Contact

Questions or suggestions? Open an issue or reach out to the community!

---

Made with ❤️ for the N8N community
