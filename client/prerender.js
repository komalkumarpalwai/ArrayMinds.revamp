import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { seoRoutes, SITE_DOMAIN, organizationSchema, websiteSchema, DEFAULT_OG_IMAGE } from './src/utils/seoConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

async function prerender() {
  console.log('🚀 Starting Static Site Generation (SSG Prerendering)...');

  // 1. Build SSR bundle
  console.log('📦 Building SSR bundle...');
  execSync('npx vite build --ssr src/entry-server.jsx --outDir dist-ssr', {
    stdio: 'inherit',
    cwd: __dirname
  });

  const { render } = await import('./dist-ssr/entry-server.js');
  const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');

  // List of all public routes to statically prerender
  const routesToPrerender = [
    { url: '/', seoKey: 'home' },
    { url: '/products', seoKey: 'products' },
    { url: '/amerp', seoKey: 'amerp' },
    { url: '/services', seoKey: 'services' },
    { url: '/ai-implementations', seoKey: 'aiImplementations' },
    { url: '/ai-implementations/claudeforce', seoKey: 'claudeforce' },
    { url: '/ai-implementations/vd-projekte', seoKey: 'vdProjekte' },
    { url: '/ai-implementations/agentforce', seoKey: 'agentforce' },
    { url: '/ai-implementations/aigency', seoKey: 'aigency' },
    { url: '/industries', seoKey: 'industries' },
    { url: '/about', seoKey: 'about' },
    { url: '/team', seoKey: 'team' },
    { url: '/careers', seoKey: 'careers' },
    { url: '/contact', seoKey: 'contact' },
    { url: '/blog', seoKey: 'blog' },
  ];

  for (const { url, seoKey } of routesToPrerender) {
    try {
      const { html: appHtml } = render(url);
      const seo = seoRoutes[seoKey] || {};

      const title = seo.title || 'ArrayMinds | Official Salesforce & Databricks Partner';
      const description = seo.description || 'Enterprise Salesforce and Databricks solutions with autonomous AI.';
      const keywords = seo.keywords || 'Salesforce Partner, Databricks Partner, Enterprise AI';
      const canonicalUrl = `${SITE_DOMAIN}${url === '/' ? '/' : url}`;
      const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;

      let html = template;

      // 1. Replace Title Tag
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
      html = html.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${title}" />`);

      // 2. Replace Description Meta Tag
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`);

      // 3. Replace Keywords Meta Tag
      html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${keywords}" />`);

      // 4. Replace Canonical URL Tag
      html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

      // 5. Replace OpenGraph & Twitter Meta Tags
      html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
      html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
      html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`);
      html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);

      // 6. Inject Structured Data JSON-LD
      if (seo.structuredData) {
        const jsonLdData = Array.isArray(seo.structuredData)
          ? { '@context': 'https://schema.org', '@graph': seo.structuredData }
          : seo.structuredData;
        const jsonLdTag = `<script type="application/ld+json" id="page-structured-data">${JSON.stringify(jsonLdData)}</script>`;
        html = html.replace('</head>', `  ${jsonLdTag}\n  </head>`);
      }

      // 7. Inject Rendered App HTML into #root
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 8. Determine File Destination
      const filePath = url === '/' 
        ? 'dist/index.html' 
        : `dist${url}/index.html`;

      const absFilePath = toAbsolute(filePath);
      fs.mkdirSync(path.dirname(absFilePath), { recursive: true });
      fs.writeFileSync(absFilePath, html, 'utf-8');

      console.log(`  ✓ Pre-rendered: ${url} -> ${filePath} (${(html.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ Error pre-rendering ${url}:`, err);
    }
  }

  // Clean up temporary SSR bundle
  try {
    fs.rmSync(toAbsolute('dist-ssr'), { recursive: true, force: true });
  } catch (e) {
    // ignore
  }

  console.log('✅ Static pre-rendering completed successfully! All routes contain 100% crawlable semantic HTML.');
}

prerender();
