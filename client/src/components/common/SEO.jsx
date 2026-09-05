import React, { useEffect } from 'react';
import { SITE_DOMAIN, DEFAULT_OG_IMAGE, SITE_NAME } from '../../utils/seoConfig';

const updateMetaTag = (selector, attribute, value) => {
  if (!value) return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    if (selector.startsWith('meta[name=')) {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) element.setAttribute('name', name);
    } else if (selector.startsWith('meta[property=')) {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (property) element.setAttribute('property', property);
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

const updateCanonical = (url) => {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
};

const updateJsonLd = (structuredData) => {
  const existingScript = document.getElementById('page-structured-data');
  if (existingScript) {
    existingScript.remove();
  }

  if (structuredData) {
    const script = document.createElement('script');
    script.id = 'page-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(
      Array.isArray(structuredData)
        ? { '@context': 'https://schema.org', '@graph': structuredData }
        : structuredData
    );
    document.head.appendChild(script);
  }
};

/**
 * High-performance, reactive SEO component
 */
const SEO = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData,
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
      updateMetaTag('meta[name="title"]', 'content', title);
      updateMetaTag('meta[property="og:title"]', 'content', title);
      updateMetaTag('meta[name="twitter:title"]', 'content', title);
    }

    // 2. Description
    if (description) {
      updateMetaTag('meta[name="description"]', 'content', description);
      updateMetaTag('meta[property="og:description"]', 'content', description);
      updateMetaTag('meta[name="twitter:description"]', 'content', description);
    }

    // 3. Keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    // 4. Canonical & URL
    const canonicalUrl = canonicalPath.startsWith('http')
      ? canonicalPath
      : `${SITE_DOMAIN}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    
    updateCanonical(canonicalUrl);
    updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    updateMetaTag('meta[name="twitter:url"]', 'content', canonicalUrl);

    // 5. Images & Types
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_DOMAIN}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
    updateMetaTag('meta[property="og:image"]', 'content', fullImageUrl);
    updateMetaTag('meta[name="twitter:image"]', 'content', fullImageUrl);
    updateMetaTag('meta[property="og:type"]', 'content', ogType);
    updateMetaTag('meta[property="og:site_name"]', 'content', SITE_NAME);

    // 6. Robots
    const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    updateMetaTag('meta[name="robots"]', 'content', robotsContent);

    // 7. Structured Data (JSON-LD)
    updateJsonLd(structuredData);

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, structuredData, noIndex]);

  return null;
};

export default SEO;
