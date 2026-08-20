import salesforceService from '../services/salesforceService.js';

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
    author: record.Author__c || 'Array-Minds Team',
    status: (record.Status__c || 'Draft').toLowerCase(),
    rawStatus: record.Status__c || 'Draft',
    publishedAt: record.Published_Date__c || record.CreatedDate,
    createdAt: record.CreatedDate,
  };
};

// @desc    Get all blogs (Published for public, all for admin)
// @route   GET /api/blogs
// @access  Public / Admin
export const getBlogs = async (req, res) => {
  try {
    const includeAll = req.query.all === 'true' || req.admin;
    
    let soql = `
      SELECT Id, Name, Title__c, Slug__c, Status__c, CreatedDate
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
    const { slug } = req.params;
    const sanitizedSlug = slug.replace(/'/g, "\\'");

    let soql = `
      SELECT Id, Name, Title__c, Slug__c, Status__c, CreatedDate
      FROM Website_Blog__c
      WHERE Slug__c = '${sanitizedSlug}'
      LIMIT 1
    `;

    let records = await salesforceService.query(soql);

    if (records.length === 0 && /^[a-zA-Z0-9]{15,18}$/.test(slug)) {
      soql = `
        SELECT Id, Name, Title__c, Slug__c, Status__c, CreatedDate
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
    const { title, slug, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const generatedSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const salesforcePayload = {
      Title__c: title,
      Name: title.length > 80 ? title.substring(0, 77) + '...' : title,
      Slug__c: generatedSlug,
      Status__c: status === 'published' ? 'Published' : status === 'archived' ? 'Archived' : 'Draft',
    };

    const result = await salesforceService.createRecord('Website_Blog__c', salesforcePayload);
    const createdRecord = await salesforceService.getRecord('Website_Blog__c', result.id);
    res.status(201).json(formatBlogRecord(createdRecord));
  } catch (error) {
    console.error('Error creating blog in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to create blog post in Salesforce',
      error: error.message 
    });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, status } = req.body;

    const salesforcePayload = {};
    if (title !== undefined) {
      salesforcePayload.Title__c = title;
      salesforcePayload.Name = title.length > 80 ? title.substring(0, 77) + '...' : title;
    }
    if (slug !== undefined) salesforcePayload.Slug__c = slug;
    if (status !== undefined) {
      salesforcePayload.Status__c = status === 'published' ? 'Published' : status === 'archived' ? 'Archived' : 'Draft';
    }

    await salesforceService.updateRecord('Website_Blog__c', id, salesforcePayload);
    const updatedRecord = await salesforceService.getRecord('Website_Blog__c', id);
    res.json(formatBlogRecord(updatedRecord));
  } catch (error) {
    console.error('Error updating blog in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to update blog post in Salesforce',
      error: error.message 
    });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
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
