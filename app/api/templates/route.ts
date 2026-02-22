import { fetchTemplates, getCategories } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const templates = await fetchTemplates();
    const categories = await getCategories(templates);

    return Response.json({
      templates,
      categories,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
