import axios from 'axios';
import { Template } from '@/types';

const REPO_OWNER = 'enescingoz';
const REPO_NAME = 'awesome-n8n-templates';
const RAW_GITHUB_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`;

// Cache for templates
let templateCache: Template[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function fetchTemplates(): Promise<Template[]> {
  // Return cached data if still fresh
  if (templateCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return templateCache;
  }

  try {
    // Fetch README which contains template list
    const readmeUrl = `${RAW_GITHUB_URL}/README.md`;
    const response = await axios.get(readmeUrl);
    const content = response.data;

    // Parse markdown content to extract templates
    const templates = parseTemplatesFromMarkdown(content);
    
    templateCache = templates;
    cacheTimestamp = Date.now();
    
    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
}

function parseTemplatesFromMarkdown(markdown: string): Template[] {
  const templates: Template[] = [];
  
  // Split by category sections (## Category Name)
  const sections = markdown.split(/\n## /);
  
  let templateId = 1;

  sections.forEach((section) => {
    // Extract category name
    const categoryMatch = section.match(/^([^\n]+)/);
    const category = categoryMatch ? categoryMatch[1].trim() : 'Other';

    // Find all template entries (assume format: `- [Title](url) - Description`)
    const templateRegex = /\n- \[([^\]]+)\]\(([^)]+)\)\s*(?:-\s*(.+))?/g;
    let match;

    while ((match = templateRegex.exec(section)) !== null) {
      const [, title, url, description] = match;

      templates.push({
        id: `template-${templateId++}`,
        title: title.trim(),
        description: description ? description.trim() : 'N8N workflow template',
        category: category.toLowerCase().replace(/\s+/g, '-'),
        tags: extractTags(title, category),
        author: {
          name: 'Community',
          url: 'https://github.com/enescingoz/awesome-n8n-templates',
        },
        source: {
          url: url.trim(),
          type: url.includes('github') ? 'github' : 'other',
        },
        rating: 0,
        downloads: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  return templates;
}

function extractTags(title: string, category: string): string[] {
  const tags: string[] = [];
  
  // Add category as tag
  tags.push(category.toLowerCase());
  
  // Extract common keywords from title
  const keywords = ['webhook', 'api', 'slack', 'email', 'database', 'automation', 'scheduling', 'transformation'];
  const titleLower = title.toLowerCase();
  
  keywords.forEach((keyword) => {
    if (titleLower.includes(keyword)) {
      tags.push(keyword);
    }
  });

  return [...new Set(tags)]; // Remove duplicates
}

export async function fetchTemplateDetail(templateId: string): Promise<Template | null> {
  const templates = await fetchTemplates();
  return templates.find((t) => t.id === templateId) || null;
}

export async function searchTemplates(
  query: string,
  templates: Template[]
): Promise<Template[]> {
  if (!query.trim()) return templates;

  const queryLower = query.toLowerCase();
  
  return templates.filter(
    (template) =>
      template.title.toLowerCase().includes(queryLower) ||
      template.description.toLowerCase().includes(queryLower) ||
      template.tags.some((tag) => tag.includes(queryLower))
  );
}

export async function getCategories(templates: Template[]) {
  const categories = new Map<string, number>();
  
  templates.forEach((template) => {
    const count = categories.get(template.category) || 0;
    categories.set(template.category, count + 1);
  });

  return Array.from(categories.entries()).map(([id, count]) => ({
    id,
    name: id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: `${count} templates`,
    color: 'accent',
    count,
  }));
}
