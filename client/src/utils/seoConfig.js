/**
 * Centralized SEO & Structured Data (JSON-LD) Configuration for ArrayMinds
 * Domain: https://www.arrayminds.in
 */

export const SITE_DOMAIN = 'https://www.arrayminds.in';
export const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/logo.png`;
export const SITE_NAME = 'ArrayMinds';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArrayMinds',
  alternateName: 'Array Minds Technologies',
  url: SITE_DOMAIN,
  logo: `${SITE_DOMAIN}/logo.png`,
  description: 'Official Salesforce and Databricks Partner specializing in enterprise AI, Agentforce ERP, AppExchange solutions, and custom cloud architectures.',
  email: 'info@arrayminds.com',
  sameAs: [
    'https://www.linkedin.com/company/arrayminds/',
    'https://x.com/arrayminds',
    'https://www.youtube.com/@ArrayMinds-he8hm',
    'https://www.facebook.com/profile.php?id=61564422908197'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44 7447 917 183',
      contactType: 'sales',
      areaServed: ['GB', 'EU', 'US'],
      availableLanguage: 'English'
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91 8754 380 969',
      contactType: 'technical support',
      areaServed: ['IN', 'APAC'],
      availableLanguage: 'English'
    }
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '25 South Park Hill Road',
      addressLocality: 'South Croydon',
      postalCode: 'CR2 7DZ',
      addressCountry: 'GB'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'INDIALAND Tech Park CHIL SEZ Campus Saravanampatti',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641035',
      addressCountry: 'IN'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '7-96/5, Heeba Villa, Shankar Nagar Colony, Uppal Depot',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500039',
      addressCountry: 'IN'
    }
  ]
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ArrayMinds',
  url: SITE_DOMAIN,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_DOMAIN}/blog?search={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

/**
 * Standard page metadata configurations
 */
export const seoRoutes = {
  home: {
    title: 'ArrayMinds | Official Salesforce & Databricks Partner | Enterprise AI Solutions',
    description: 'Empowering global enterprises with next-generation Salesforce architecture, Databricks analytics lakehouse, autonomous Agentforce AI, AM ERP, and custom cloud engineering.',
    keywords: 'Salesforce Partner, Databricks Partner, Enterprise AI Solutions, Agentforce ERP, AM ERP, Salesforce Consulting London, Salesforce Consulting India, Cloud Transformation',
    canonicalPath: '/',
    structuredData: [
      organizationSchema,
      websiteSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'ArrayMinds Salesforce & Databricks Consulting',
        image: DEFAULT_OG_IMAGE,
        url: SITE_DOMAIN,
        telephone: '+44 7447 917 183',
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '25 South Park Hill Road',
          addressLocality: 'South Croydon',
          postalCode: 'CR2 7DZ',
          addressCountry: 'GB'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Enterprise Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Salesforce Enterprise Architecture & Consulting'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Databricks Data Lakehouse & AI Analytics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Autonomous AI & Agentforce Implementations'
              }
            }
          ]
        }
      }
    ]
  },
  products: {
    title: 'Salesforce AppExchange Products | QuickFile, DocCrafter & AM ERP | ArrayMinds',
    description: 'Explore high-performance Salesforce AppExchange apps engineered by ArrayMinds: QuickFile multi-cloud file management, DocCrafter document generation, and custom enterprise tools.',
    keywords: 'Salesforce AppExchange, QuickFile Salesforce, DocCrafter Salesforce, Salesforce Document Generation, Salesforce File Management, ArrayMinds Apps',
    canonicalPath: '/products',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'QuickFile for Salesforce',
        operatingSystem: 'Salesforce CRM',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: 'Contact for pricing',
          priceCurrency: 'USD'
        },
        description: 'Multi-cloud file manager and storage offloader directly embedded in Salesforce.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DocCrafter for Salesforce',
        operatingSystem: 'Salesforce CRM',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: 'Contact for pricing',
          priceCurrency: 'USD'
        },
        description: 'Automated dynamic document and PDF generation for enterprise Salesforce orgs.'
      }
    ]
  },
  amerp: {
    title: 'AM ERP | Native Salesforce Enterprise Resource Planning | ArrayMinds',
    description: 'AM ERP is ArrayMinds 100% native Salesforce ERP solution combining automated supply chain, multi-currency accounting, inventory management, and Agentforce AI workflows.',
    keywords: 'Salesforce ERP, AM ERP, Native Salesforce ERP, Cloud ERP Software, Supply Chain Automation Salesforce, Agentforce ERP',
    canonicalPath: '/amerp',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AM ERP (ArrayMinds Enterprise Resource Planning)',
        operatingSystem: 'Salesforce Lightning Platform',
        applicationCategory: 'EnterpriseResourcePlanning',
        publisher: {
          '@type': 'Organization',
          name: 'ArrayMinds'
        },
        description: 'Comprehensive, cloud-native ERP platform built natively on Salesforce with autonomous AI & Agentforce capabilities.'
      }
    ]
  },
  services: {
    title: 'Enterprise Services & Consulting | Salesforce & Databricks Lakehouse | ArrayMinds',
    description: 'Accelerate digital transformation with ArrayMinds consulting services: Salesforce Multi-Cloud, Databricks Analytics & Lakehouse, Custom Cloud Engineering, and Agentforce AI.',
    keywords: 'Salesforce Consulting Services, Databricks Lakehouse Consulting, Custom Cloud Engineering, Salesforce Integrations, AI Transformation Services',
    canonicalPath: '/services',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Enterprise Cloud & Data Consulting',
        provider: organizationSchema,
        areaServed: ['GB', 'US', 'IN', 'EU'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Consulting Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Salesforce Architecture & Implementation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Databricks Lakehouse & Data Engineering' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Cloud & API Integration' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Autonomous Enterprise AI & Agentforce' } }
          ]
        }
      }
    ]
  },
  aiImplementations: {
    title: 'Autonomous Enterprise AI & Agentforce Implementations | ArrayMinds',
    description: 'Deploy cutting-edge autonomous AI agents, Salesforce Agentforce, multi-agent frameworks, and custom LLM workflows that automate enterprise business operations.',
    keywords: 'Autonomous AI, Salesforce Agentforce, Multi-Agent Systems, Enterprise AI Implementation, LLM Workflows, AI in Manufacturing, ArrayMinds AI',
    canonicalPath: '/ai-implementations',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Autonomous AI & Agentforce Implementation Services',
        provider: organizationSchema,
        description: 'End-to-end deployment of enterprise autonomous AI agents and Salesforce Agentforce architectures.'
      }
    ]
  },
  vdProjekte: {
    title: 'Case Study: VD-Projekte AI ERP & Automation | ArrayMinds',
    description: 'Explore how ArrayMinds transformed German construction enterprise VD-Projekte with automated ERP, digital invoicing, real-time project tracking, and autonomous AI agents.',
    keywords: 'VD-Projekte Case Study, German Construction ERP, Construction Automation Salesforce, AI Case Studies ArrayMinds',
    canonicalPath: '/ai-implementations/vd-projekte'
  },
  agentforce: {
    title: 'Agentforce ERP & Autonomous Salesforce AI Agents | ArrayMinds',
    description: 'Discover how ArrayMinds builds autonomous Agentforce AI agents inside Salesforce and AM ERP to automate complex customer service, billing, inventory, and field operations.',
    keywords: 'Agentforce Salesforce, Salesforce Autonomous AI, Agentforce ERP, AI Agent Workflows, Salesforce Einstein 1',
    canonicalPath: '/ai-implementations/agentforce'
  },
  aigency: {
    title: 'AiGency | Multi-Agent Autonomous Marketing & Operations | ArrayMinds',
    description: 'AiGency multi-agent platform connects specialized AI agents to autonomously manage research, content generation, campaigns, customer analytics, and enterprise workflows.',
    keywords: 'AiGency, Multi-Agent AI Framework, Autonomous Marketing Agents, ArrayMinds AI Platform',
    canonicalPath: '/ai-implementations/aigency'
  },
  claudeforce: {
    title: 'Claudeforce: Anthropic Claude 3.5 & Salesforce MCP Integration | ArrayMinds',
    description: 'Deploy Anthropic Claude 3.5 natively inside Salesforce using Model Context Protocol (MCP). Autonomous schema querying, Apex code generation, and enterprise governance.',
    keywords: 'Claudeforce, Anthropic Claude Salesforce, Model Context Protocol MCP Salesforce, Claude 3.5 Sonnet CRM, Autonomous Salesforce AI, Agentforce Alternative, ArrayMinds',
    canonicalPath: '/ai-implementations/claudeforce'
  },
  industries: {
    title: 'Industry Solutions | Manufacturing, Healthcare, Finance & Logistics | ArrayMinds',
    description: 'Tailored Salesforce, Databricks, and AI solutions engineered for Manufacturing, Financial Services, Healthcare & Life Sciences, Retail, and Logistics & Supply Chain.',
    keywords: 'Salesforce for Manufacturing, Healthcare Salesforce, Databricks Financial Services, Supply Chain Cloud Solutions',
    canonicalPath: '/industries'
  },
  about: {
    title: 'About ArrayMinds | Our Vision, Mission & Global Engineering Delivery',
    description: 'Learn about ArrayMinds, our certified Salesforce & Databricks architects, global offices in the UK and India, and our commitment to enterprise software excellence.',
    keywords: 'About ArrayMinds, Salesforce Partner UK, Salesforce Partner India, Databricks Partner, ArrayMinds Leadership',
    canonicalPath: '/about',
    structuredData: [
      organizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About ArrayMinds',
        url: `${SITE_DOMAIN}/about`
      }
    ]
  },
  team: {
    title: 'Leadership & Engineering Team | Certified Salesforce & Databricks Architects | ArrayMinds',
    description: 'Meet the visionaries, Salesforce MVPs, Databricks data champions, and senior cloud engineers driving high-impact transformations at ArrayMinds.',
    keywords: 'ArrayMinds Team, Salesforce Architects, Databricks Champions, Enterprise Engineering Leaders',
    canonicalPath: '/team'
  },
  careers: {
    title: 'Careers at ArrayMinds | Join Our Global Salesforce & AI Team',
    description: 'Build the future of enterprise cloud and AI. Explore career opportunities for Salesforce Developers, Databricks Data Engineers, AI Specialists, and Solution Architects.',
    keywords: 'ArrayMinds Careers, Salesforce Jobs, Databricks Jobs, AI Engineer Jobs India UK, Tech Careers',
    canonicalPath: '/careers'
  },
  contact: {
    title: 'Contact ArrayMinds | London UK, Coimbatore & Hyderabad Offices',
    description: 'Get in touch with ArrayMinds enterprise consulting teams. Reach our London (UK), Coimbatore (Tamil Nadu), and Hyderabad (Telangana) offices for consultations.',
    keywords: 'Contact ArrayMinds, Salesforce Consultant London, Salesforce Consultant Coimbatore, Salesforce Consultant Hyderabad, Contact Info',
    canonicalPath: '/contact',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact ArrayMinds',
        url: `${SITE_DOMAIN}/contact`
      },
      organizationSchema
    ]
  },
  blog: {
    title: 'Insights & Technical Blog | Salesforce, Databricks & AI | ArrayMinds',
    description: 'Stay ahead with deep dives, architecture best practices, tutorials, and executive insights on Salesforce, Databricks Lakehouse, Agentforce, and Enterprise AI.',
    keywords: 'Salesforce Blog, Databricks Tutorials, Enterprise AI Insights, Agentforce Guides, Tech Insights ArrayMinds',
    canonicalPath: '/blog',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'ArrayMinds Tech Insights',
        url: `${SITE_DOMAIN}/blog`,
        publisher: organizationSchema
      }
    ]
  }
};
