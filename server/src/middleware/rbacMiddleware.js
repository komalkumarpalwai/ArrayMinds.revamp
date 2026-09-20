import { getPermissionsForRole } from '../config/rbacConfig.js';

/**
 * Ensures the authenticated user has a specific permission.
 * @param {string} requiredPermission
 */
export const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userPermissions = getPermissionsForRole(req.admin.role) || req.admin.permissions || [];

    // Super Admin role automatically bypasses all permission checks
    if (req.admin.role?.toLowerCase() === 'super admin' || userPermissions.includes(requiredPermission)) {
      return next();
    }

    return res.status(403).json({
      message: 'Access Denied: You lack the required permission for this operation.',
      requiredPermission,
      userRole: req.admin.role,
    });
  };
};

/**
 * Ensures the authenticated user has at least one of the specified permissions.
 * @param {string[]} permissionsArray
 */
export const requireAnyPermission = (permissionsArray = []) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userPermissions = getPermissionsForRole(req.admin.role) || req.admin.permissions || [];

    if (
      req.admin.role?.toLowerCase() === 'super admin' ||
      permissionsArray.some((p) => userPermissions.includes(p))
    ) {
      return next();
    }

    return res.status(403).json({
      message: 'Access Denied: You do not possess any of the authorized permissions for this resource.',
      requiredPermissions: permissionsArray,
      userRole: req.admin.role,
    });
  };
};
