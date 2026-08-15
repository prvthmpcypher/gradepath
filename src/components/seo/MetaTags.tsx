import React, { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: Record<string, unknown>;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  canonicalPath = '',
  schema,
}) => {
  useEffect(() => {
    // 1. Set Title
    document.title = title;

    // 2. Set Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Set Canonical Link
    const fullCanonicalUrl = `https://gradepath.poorvithmp.com${canonicalPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Set OpenGraph tags
    const updateOG = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    };

    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:url', fullCanonicalUrl);

    // 5. Update / Inject JSON-LD Schema
    const existingSchemaScript = document.getElementById('route-jsonld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'route-jsonld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalPath, schema]);

  return null;
};
