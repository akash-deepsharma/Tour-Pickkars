export const dynamic = 'force-static';
import { api } from "@/services/config";


// app/robots.txt/route.js
export async function GET() {
  try {
    // Laravel API se data fetch karo
    const res = await api.get('robots-text');
    
    // Response data access karo
    const robotsContent = res.data?.robots_txt ||
      `
User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap.xml
      `.trim();

    return new Response(robotsContent, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error('Error fetching robots.txt:', error);
    
    // Fallback content
    const fallbackContent = `
User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap.xml
    `.trim();

    return new Response(fallbackContent, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}