import salesforceService from '../services/salesforceService.js';

let cachedBlogFields = null;
let lastFieldFetchTime = 0;

export const getBlogFieldNames = async (forceRefresh = false) => {
  const now = Date.now();
  if (forceRefresh || !cachedBlogFields || (now - lastFieldFetchTime) > 10000) {
    try {
      const desc = await salesforceService.request('/sobjects/Website_Blog__c/describe');
      cachedBlogFields = new Set(desc.fields.map(f => f.name));
      lastFieldFetchTime = now;
    } catch {
      if (!cachedBlogFields) {
        cachedBlogFields = new Set([
          'Id', 'Name', 'Title__c', 'Slug__c', 'Status__c', 'Excerpt__c', 'Content__c', 
          'Featured_Image_URL__c', 'Published_Date__c', 'Category__c', 'Tags__c', 
          'Reading_Time__c', 'Is_Featured__c', 'Article_Author__c', 'Author_LinkedIn_URL__c', 
          'Author_X_URL__c', 'SEO_Title__c', 'SEO_Description__c'
        ]);
      }
    }
  }
  return cachedBlogFields;
};

/**
 * Format Salesforce Website_Blog__c record to standard API response
 */
const formatBlogRecord = (record) => {
  if (!record) return null;
  return {
    _id: record.Id,
    id: record.Id,
    name: record.Name,
    title: record.Title__c || record.Name || 'Article',
    slug: record.Slug__c || (record.Title__c ? record.Title__c.toLowerCase().replace(/[^a-z0-9]+/g, '-') : record.Id),
    excerpt: record.Excerpt__c || '',
    content: record.Content__c || '',
    featuredImage: record.Featured_Image_URL__c || '',
    category: record.Category__c || 'Technology',
    tags: record.Tags__c ? record.Tags__c.split(',').map(t => t.trim()) : [],
    readingTime: record.Reading_Time__c || 5,
    isFeatured: !!record.Is_Featured__c,
    author: record.Article_Author__c || 'Array-Minds Editorial Team',
    articleAuthor: record.Article_Author__c || '',
    authorLinkedInUrl: record.Author_LinkedIn_URL__c || '',
    authorXUrl: record.Author_X_URL__c || '',
    seoTitle: record.SEO_Title__c || '',
    seoDescription: record.SEO_Description__c || '',
    status: (record.Status__c || 'Draft').toLowerCase(),
    rawStatus: record.Status__c || 'Draft',
    publishedAt: record.Published_Date__c || record.CreatedDate,
    createdAt: record.CreatedDate,
    updatedAt: record.LastModifiedDate || record.CreatedDate,
  };
};

const getSoqlFields = async () => {
  const fields = await getBlogFieldNames();
  const authorField = fields.has('Article_Author__c') ? 'Article_Author__c, ' : '';
  return `
    Id, Name, Title__c, Slug__c, Status__c, Excerpt__c, Content__c, 
    Featured_Image_URL__c, Published_Date__c, Category__c, Tags__c, 
    Reading_Time__c, Is_Featured__c, ${authorField}Author_LinkedIn_URL__c, Author_X_URL__c,
    SEO_Title__c, SEO_Description__c,
    CreatedDate, LastModifiedDate
  `;
};

// @desc    Get all blogs (Published for public, all for admin)
// @route   GET /api/blogs
// @access  Public / Admin
export const getBlogs = async (req, res) => {
  try {
    const includeAll = req.query.all === 'true' || req.admin;
    const soqlFields = await getSoqlFields();
    
    let soql = `
      SELECT ${soqlFields}
      FROM Website_Blog__c
    `;

    if (!includeAll) {
      soql += ` WHERE Status__c = 'Published' OR Status__c = 'published'`;
    }

    soql += ` ORDER BY CreatedDate DESC`;

    const records = await salesforceService.query(soql);
    const blogs = records.map(formatBlogRecord);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to fetch blogs from Salesforce',
      error: error.message 
    });
  }
};

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const slug = req.params.slug || req.params.id;
    const sanitizedSlug = slug.replace(/'/g, "\\'");
    const soqlFields = await getSoqlFields();

    let soql = `
      SELECT ${soqlFields}
      FROM Website_Blog__c
      WHERE Slug__c = '${sanitizedSlug}'
      LIMIT 1
    `;

    let records = await salesforceService.query(soql);

    if (records.length === 0 && /^[a-zA-Z0-9]{15,18}$/.test(slug)) {
      soql = `
        SELECT ${soqlFields}
        FROM Website_Blog__c
        WHERE Id = '${sanitizedSlug}'
        LIMIT 1
      `;
      records = await salesforceService.query(soql);
    }

    if (records.length === 0) {
      return res.status(404).json({ message: 'Blog post not found in Salesforce' });
    }

    res.json(formatBlogRecord(records[0]));
  } catch (error) {
    console.error('Error fetching blog from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to fetch blog post from Salesforce',
      error: error.message 
    });
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
  try {
    const { 
      title, 
      slug, 
      status, 
      excerpt, 
      content, 
      featuredImage, 
      category, 
      tags, 
      readingTime, 
      isFeatured,
      author,
      authorLinkedInUrl,
      authorXUrl,
      authorLinkedIn,
      authorX,
      seoTitle,
      seoDescription
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const generatedSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const normalizedStatus = status === 'published' || status === 'Published' 
      ? 'Published' 
      : status === 'archived' || status === 'Archived' 
      ? 'Archived' 
      : 'Draft';

    // IMPORTANT: Never send "Name" as it is an auto-number field in Salesforce
    const salesforcePayload = {
      Title__c: title,
      Slug__c: generatedSlug,
      Status__c: normalizedStatus,
    };

    if (excerpt) salesforcePayload.Excerpt__c = excerpt;
    if (content) salesforcePayload.Content__c = content;
    if (featuredImage) salesforcePayload.Featured_Image_URL__c = featuredImage;
    if (category) salesforcePayload.Category__c = category;
    if (tags) salesforcePayload.Tags__c = Array.isArray(tags) ? tags.join(', ') : tags;
    if (readingTime) salesforcePayload.Reading_Time__c = parseFloat(readingTime) || 5;
    if (isFeatured !== undefined) salesforcePayload.Is_Featured__c = !!isFeatured;
    
    let sfFields = await getBlogFieldNames();
    
    // Strictly use Article_Author__c (Text(255)) for author name
    const authorVal = req.body.articleAuthor || author;
    if (authorVal) {
      const trimmed = typeof authorVal === 'string' ? authorVal.trim().slice(0, 255) : '';
      if (!sfFields.has('Article_Author__c')) {
        // Refresh cache in case Article_Author__c was just created in Salesforce
        sfFields = await getBlogFieldNames(true);
      }
      if (sfFields.has('Article_Author__c') && trimmed) {
        salesforcePayload.Article_Author__c = trimmed;
      }
    }

    if (authorLinkedInUrl || authorLinkedIn) salesforcePayload.Author_LinkedIn_URL__c = authorLinkedInUrl || authorLinkedIn;
    if (authorXUrl || authorX) salesforcePayload.Author_X_URL__c = authorXUrl || authorX;
    if (seoTitle) salesforcePayload.SEO_Title__c = seoTitle;
    if (seoDescription) salesforcePayload.SEO_Description__c = seoDescription;

    if (normalizedStatus === 'Published') {
      salesforcePayload.Published_Date__c = new Date().toISOString();
    }

    const result = await salesforceService.createRecord('Website_Blog__c', salesforcePayload);
    const createdRecord = await salesforceService.getRecord('Website_Blog__c', result.id);
    res.status(201).json(formatBlogRecord(createdRecord));
  } catch (error) {
    console.error('Error creating blog in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to create blog post in Salesforce: ' + error.message,
      error: error.message 
    });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id || req.params.slug;
    const { 
      title, 
      slug, 
      status, 
      excerpt, 
      content, 
      featuredImage, 
      category, 
      tags, 
      readingTime, 
      isFeatured,
      author,
      authorLinkedInUrl,
      authorXUrl,
      authorLinkedIn,
      authorX,
      seoTitle,
      seoDescription
    } = req.body;

    const salesforcePayload = {};
    if (title !== undefined) salesforcePayload.Title__c = title;
    if (slug !== undefined) salesforcePayload.Slug__c = slug;
    
    if (status !== undefined) {
      salesforcePayload.Status__c = status === 'published' || status === 'Published' 
        ? 'Published' 
        : status === 'archived' || status === 'Archived' 
        ? 'Archived' 
        : 'Draft';
      
      if (salesforcePayload.Status__c === 'Published') {
        salesforcePayload.Published_Date__c = new Date().toISOString();
      }
    }

    if (excerpt !== undefined) salesforcePayload.Excerpt__c = excerpt;
    if (content !== undefined) salesforcePayload.Content__c = content;
    if (featuredImage !== undefined) salesforcePayload.Featured_Image_URL__c = featuredImage;
    if (category !== undefined) salesforcePayload.Category__c = category;
    if (tags !== undefined) salesforcePayload.Tags__c = Array.isArray(tags) ? tags.join(', ') : tags;
    if (readingTime !== undefined) salesforcePayload.Reading_Time__c = parseFloat(readingTime) || 5;
    if (isFeatured !== undefined) salesforcePayload.Is_Featured__c = !!isFeatured;

    let sfFields = await getBlogFieldNames();

    // Strictly use Article_Author__c (Text(255)) for author name
    const authorVal = req.body.articleAuthor !== undefined ? req.body.articleAuthor : author;
    if (authorVal !== undefined) {
      const trimmed = typeof authorVal === 'string' ? authorVal.trim().slice(0, 255) : '';
      if (!sfFields.has('Article_Author__c')) {
        // Refresh cache in case Article_Author__c was just created in Salesforce
        sfFields = await getBlogFieldNames(true);
      }
      if (sfFields.has('Article_Author__c')) {
        salesforcePayload.Article_Author__c = trimmed;
      }
    }

    if (authorLinkedInUrl !== undefined || authorLinkedIn !== undefined) {
      salesforcePayload.Author_LinkedIn_URL__c = authorLinkedInUrl !== undefined ? authorLinkedInUrl : authorLinkedIn;
    }
    if (authorXUrl !== undefined || authorX !== undefined) {
      salesforcePayload.Author_X_URL__c = authorXUrl !== undefined ? authorXUrl : authorX;
    }
    if (seoTitle !== undefined) salesforcePayload.SEO_Title__c = seoTitle;
    if (seoDescription !== undefined) salesforcePayload.SEO_Description__c = seoDescription;

    await salesforceService.updateRecord('Website_Blog__c', id, salesforcePayload);
    const updatedRecord = await salesforceService.getRecord('Website_Blog__c', id);
    res.json(formatBlogRecord(updatedRecord));
  } catch (error) {
    console.error('Error updating blog in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to update blog post in Salesforce: ' + error.message,
      error: error.message 
    });
  }
};


// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id || req.params.slug;
    await salesforceService.deleteRecord('Website_Blog__c', id);
    res.json({ message: 'Blog post removed successfully from Salesforce', id });
  } catch (error) {
    console.error('Error deleting blog from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to delete blog post from Salesforce',
      error: error.message 
    });
  }
};
