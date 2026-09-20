/**
 * Role-Based Access Control (RBAC) Configuration for ArrayMinds Admin Portal
 * Granular permissions and standard role mappings
 */

export const PERMISSIONS = {
  // Blog / Content Permissions
  BLOG_VIEW: 'BLOG_VIEW',
  BLOG_CREATE: 'BLOG_CREATE',
  BLOG_EDIT: 'BLOG_EDIT',
  BLOG_DELETE: 'BLOG_DELETE',
  BLOG_PUBLISH: 'BLOG_PUBLISH',

  // Careers / HR Permissions
  CAREER_VIEW: 'CAREER_VIEW',
  CAREER_CREATE: 'CAREER_CREATE',
  CAREER_EDIT: 'CAREER_EDIT',
  CAREER_DELETE: 'CAREER_DELETE',
  APPLICATION_VIEW: 'APPLICATION_VIEW',

  // Contact / Lead Permissions
  CONTACT_VIEW: 'CONTACT_VIEW',
  CONTACT_MANAGE: 'CONTACT_MANAGE',

  // User Administration Permissions
  USER_VIEW: 'USER_VIEW',
  USER_CREATE: 'USER_CREATE',
  USER_EDIT: 'USER_EDIT',
  USER_DELETE: 'USER_DELETE',
  USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',

  // Media & Assets Permissions
  MEDIA_VIEW: 'MEDIA_VIEW',
  MEDIA_UPLOAD: 'MEDIA_UPLOAD',
  MEDIA_DELETE: 'MEDIA_DELETE',

  // Analytics & Insights Permissions
  ANALYTICS_VIEW: 'ANALYTICS_VIEW',

  // System & Security Permissions
  SETTINGS_VIEW: 'SETTINGS_VIEW',
  SETTINGS_EDIT: 'SETTINGS_EDIT',
  AUDIT_VIEW: 'AUDIT_VIEW',
};

/**
 * Standard System Roles and their granted permissions
 */
export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  DIGITAL_MARKETING: 'Digital Marketing',
  HR: 'HR',
  CONTENT_EDITOR: 'Content Editor',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),

  [ROLES.ADMIN]: [
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.BLOG_CREATE,
    PERMISSIONS.BLOG_EDIT,
    PERMISSIONS.BLOG_DELETE,
    PERMISSIONS.BLOG_PUBLISH,
    PERMISSIONS.CAREER_VIEW,
    PERMISSIONS.CAREER_CREATE,
    PERMISSIONS.CAREER_EDIT,
    PERMISSIONS.CAREER_DELETE,
    PERMISSIONS.APPLICATION_VIEW,
    PERMISSIONS.CONTACT_VIEW,
    PERMISSIONS.CONTACT_MANAGE,
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_EDIT,
    PERMISSIONS.USER_RESET_PASSWORD,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_DELETE,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.AUDIT_VIEW,
  ],

  [ROLES.DIGITAL_MARKETING]: [
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.BLOG_CREATE,
    PERMISSIONS.BLOG_EDIT,
    PERMISSIONS.BLOG_DELETE,
    PERMISSIONS.BLOG_PUBLISH,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.ANALYTICS_VIEW,
  ],

  [ROLES.HR]: [
    PERMISSIONS.CAREER_VIEW,
    PERMISSIONS.CAREER_CREATE,
    PERMISSIONS.CAREER_EDIT,
    PERMISSIONS.CAREER_DELETE,
    PERMISSIONS.APPLICATION_VIEW,
  ],

  [ROLES.CONTENT_EDITOR]: [
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.BLOG_CREATE,
    PERMISSIONS.BLOG_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
  ],
};

/**
 * Resolves permissions for a given role name.
 * Default to empty array if role is unknown.
 */
export const getPermissionsForRole = (role) => {
  if (!role) return [];
  // Normalize casing and spaces
  const normalized = Object.keys(ROLE_PERMISSIONS).find(
    (r) => r.toLowerCase() === role.trim().toLowerCase()
  );
  if (normalized) {
    return ROLE_PERMISSIONS[normalized];
  }

  // Fallback check against role values directly
  const match = Object.entries(ROLE_PERMISSIONS).find(
    ([roleName]) => roleName.toLowerCase() === role.trim().toLowerCase()
  );
  return match ? match[1] : [];
};

/**
 * Available Departments in ArrayMinds
 */
export const DEPARTMENTS = [
  'Executive',
  'Marketing & Growth',
  'Human Resources',
  'Cloud & Salesforce Engineering',
  'AI & Data Practice',
  'Consulting & Delivery',
  'Operations',
];
