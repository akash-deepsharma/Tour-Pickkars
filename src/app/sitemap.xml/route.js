// export const dynamic = 'force-static';
// import { api } from "@/services/config";

// export async function GET() {
//   const baseUrl =
//     process?.env?.NEXT_PUBLIC_SITE_URL || "https://www.enlivetrips.com";

//   try {
//     // Multiple API calls for different data
//     const res = await api.get("sitemap-xml");

//     const urls = [
//       {
//         url: baseUrl,
//         lastmod: new Date().toISOString().split("T")[0],
//         changefreq: "weekly",
//         priority: "1.0",
//       },
//       {
//         url: `${baseUrl}/about`,
//         lastmod: new Date().toISOString().split("T")[0],
//         changefreq: "monthly",
//         priority: "0.8",
//       },
//       {
//         url: `${baseUrl}/contact`,
//         lastmod: new Date().toISOString().split("T")[0],
//         changefreq: "monthly",
//         priority: "0.8",
//       },
//       {
//         url: `${baseUrl}/blog`,
//         lastmod: new Date().toISOString().split("T")[0],
//         changefreq: "monthly",
//         priority: "0.8",
//       },

//       // Dynamic pages from API
//       ...res.data.map((page) => ({
//         url: `${baseUrl}/${page.url}`,
//         lastmod: page.lastmod,
//         changefreq: page.changefreq,
//         priority: page.priority,
//       })),
//     ];

//     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   ${urls
//     .map(
//       (url) => `
//   <url>
//     <loc>${url.url}</loc>
//     <lastmod>${url.lastmod}</lastmod>
//     <changefreq>${url.changefreq}</changefreq>
//     <priority>${url.priority}</priority>
//   </url>
//   `
//     )
//     .join("")}
// </urlset>`;

//     return new Response(sitemap, {
//       headers: {
//         "Content-Type": "application/xml",
//         "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
//       },
//     });
//   } catch (error) {
//     console.error("Sitemap generation error:", error);

//     // Basic fallback sitemap
//     const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <url>
//     <loc>${baseUrl}</loc>
//     <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>1.0</priority>
//   </url>
//   <url>
//     <loc>${baseUrl}/about</loc>
//     <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.8</priority>
//   </url>
// </urlset>`;

//     return new Response(fallbackSitemap, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });
//   }
// }


export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.enlivetrips.com";
  
  // Static URLs that always exist
  const staticUrls = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/about`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
  ];

  try {
    // Add timeout to API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap-xml`, {
      signal: controller.signal,
      next: { revalidate: 86400 } // Cache for 24 hours
    }).catch(() => null);
    
    clearTimeout(timeoutId);

    let dynamicUrls = [];
    if (res && res.ok) {
      const data = await res.json();
      dynamicUrls = data.map((page) => ({
        url: `${baseUrl}/${page.url}`,
        lastmod: page.lastmod,
        changefreq: page.changefreq,
        priority: page.priority,
      }));
    }

    const allUrls = [...staticUrls, ...dynamicUrls];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    
    // Fallback to static URLs only
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls
    .map(
      (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
}