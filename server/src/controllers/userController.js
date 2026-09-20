import bcrypt from 'bcryptjs';
import salesforceService from '../services/salesforceService.js';
import auditService from '../services/auditService.js';
import { validatePasswordStrength } from './authController.js';
import { ROLES, DEPARTMENTS } from '../config/rbacConfig.js';

/**
 * Format Salesforce Website_User__c record for safe API response
 * Strips password hash and reset tokens
 */
const formatUserRecord = (record) => {
  if (!record) return null;
  return {
    id: record.Id,
    _id: record.Id,
    name: record.Name,
    username: record.Username__c,
    email: record.Username__c,
    role: record.Role__c || ROLES.ADMIN,
    department: record.Department__c || 'General',
    status: record.Status__c || 'Active',
    isActive: (record.Status__c || 'Active').toLowerCase() === 'active',
    isLocked: !!record.Account_Locked__c,
    failedAttempts: record.Failed_Login_Attempts__c || 0,
    lastLogin: record.Last_Login__c || null,
    createdAt: record.CreatedDate,
    updatedAt: record.LastModifiedDate,
  };
};

/**
 * @desc    Get all website admin users with search and filtering
 * @route   GET /api/users
 * @access  Private (USER_VIEW permission)
 */
export const getUsers = async (req, res) => {
  try {
    const { role, department, status, search, limit = 50 } = req.query;

    let soql = `
      SELECT Id, Name, Username__c, Role__c, Department__c, Status__c, 
             Account_Locked__c, Failed_Login_Attempts__c, Last_Login__c, 
             CreatedDate, LastModifiedDate
      FROM Website_User__c
    `;

    const conditions = [];

    if (role) {
      conditions.push(`Role__c = '${role.replace(/'/g, "\\'")}'`);
    }
    if (department) {
      conditions.push(`Department__c = '${department.replace(/'/g, "\\'")}'`);
    }
    if (status) {
      conditions.push(`Status__c = '${status.replace(/'/g, "\\'")}'`);
    }
    if (search) {
      const q = search.trim().replace(/'/g, "\\'");
      conditions.push(`Username__c LIKE '%${q}%'`);
    }

    if (conditions.length > 0) {
      soql += ` WHERE ${conditions.join(' AND ')}`;
    }

    soql += ` ORDER BY CreatedDate DESC LIMIT ${Math.min(parseInt(limit) || 50, 200)}`;

    const records = await salesforceService.query(soql);
    const users = records.map(formatUserRecord);

    res.json({
      success: true,
      count: users.length,
      users,
      availableRoles: Object.values(ROLES),
      availableDepartments: DEPARTMENTS,
    });
  } catch (error) {
    console.error('Error fetching users from Salesforce:', error);
    res.status(500).json({
      message: 'Failed to retrieve website users from Salesforce.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Private (USER_VIEW permission)
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const soql = `
      SELECT Id, Name, Username__c, Role__c, Department__c, Status__c, 
             Account_Locked__c, Failed_Login_Attempts__c, Last_Login__c, 
             CreatedDate, LastModifiedDate
      FROM Website_User__c
      WHERE Id = '${id.replace(/'/g, "\\'")}'
      LIMIT 1
    `;

    const records = await salesforceService.query(soql);
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(formatUserRecord(records[0]));
  } catch (error) {
    console.error('Error fetching user detail:', error);
    res.status(500).json({ message: 'Failed to retrieve user details', error: error.message });
  }
};

/**
 * @desc    Create new website admin user
 * @route   POST /api/users
 * @access  Private (USER_CREATE permission)
 */
export const createUser = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { username, password, confirmPassword, role, department, status } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username/email and password are required.' });
  }

  if (confirmPassword && password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // Validate strict password complexity
  const strength = validatePasswordStrength(password);
  if (!strength.valid) {
    return res.status(400).json({ message: strength.message });
  }

  const cleanEmail = username.trim().toLowerCase();

  try {
    // Check if user with this username/email already exists
    const existing = await salesforceService.query(
      `SELECT Id FROM Website_User__c WHERE Username__c = '${cleanEmail.replace(/'/g, "\\'")}' LIMIT 1`
    );

    if (existing && existing.length > 0) {
      return res.status(409).json({ message: 'A user with this username or email already exists.' });
    }

    // Securely hash password with bcrypt (12 rounds)
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userPayload = {
      Username__c: cleanEmail,
      Password_Hash__c: passwordHash,
      Role__c: role || ROLES.ADMIN,
      Department__c: department || 'General',
      Status__c: status || 'Active',
      Account_Locked__c: false,
      Failed_Login_Attempts__c: 0,
    };

    const sfResult = await salesforceService.createRecord('Website_User__c', userPayload);

    auditService.logEvent({
      action: 'USER_CREATED',
      user: req.admin,
      targetRecord: sfResult.id,
      details: { username: cleanEmail, role: userPayload.Role__c, department: userPayload.Department__c },
      result: 'SUCCESS',
      ipAddress: ip,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      id: sfResult.id,
    });
  } catch (error) {
    console.error('Error creating user in Salesforce:', error);
    res.status(500).json({
      message: 'Failed to create user in Salesforce.',
      error: error.message,
    });
  }
};

/**
 * @desc    Update user details (Role, Department, Status)
 * @route   PUT /api/users/:id
 * @access  Private (USER_EDIT permission)
 */
export const updateUser = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { id } = req.params;
  const { role, department, status } = req.body;

  try {
    const updatePayload = {};
    if (role !== undefined) updatePayload.Role__c = role;
    if (department !== undefined) updatePayload.Department__c = department;
    if (status !== undefined) updatePayload.Status__c = status;

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    await salesforceService.updateRecord('Website_User__c', id, updatePayload);

    auditService.logEvent({
      action: 'USER_UPDATED',
      user: req.admin,
      targetRecord: id,
      details: updatePayload,
      result: 'SUCCESS',
      ipAddress: ip,
    });

    res.json({ success: true, message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user in Salesforce:', error);
    res.status(500).json({ message: 'Failed to update user in Salesforce.', error: error.message });
  }
};

/**
 * @desc    Toggle user status (Activate / Deactivate)
 * @route   PATCH /api/users/:id/status
 * @access  Private (USER_EDIT permission)
 */
export const toggleUserStatus = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { id } = req.params;
  const { status } = req.body; // 'Active' or 'Inactive'

  if (!status || !['Active', 'Inactive'].includes(status)) {
    return res.status(400).json({ message: "Status must be 'Active' or 'Inactive'" });
  }

  try {
    await salesforceService.updateRecord('Website_User__c', id, {
      Status__c: status,
    });

    auditService.logEvent({
      action: status === 'Active' ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
      user: req.admin,
      targetRecord: id,
      result: 'SUCCESS',
      ipAddress: ip,
    });

    res.json({
      success: true,
      message: `User has been ${status === 'Active' ? 'activated' : 'deactivated'}.`,
      status,
    });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ message: 'Failed to update user status.', error: error.message });
  }
};

/**
 * @desc    Toggle account lock state
 * @route   PATCH /api/users/:id/lock
 * @access  Private (USER_EDIT permission)
 */
export const toggleUserLock = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { id } = req.params;
  const { locked } = req.body; // true or false

  if (typeof locked !== 'boolean') {
    return res.status(400).json({ message: 'locked parameter must be boolean' });
  }

  try {
    await salesforceService.updateRecord('Website_User__c', id, {
      Account_Locked__c: locked,
      Failed_Login_Attempts__c: locked ? 5 : 0,
    });

    auditService.logEvent({
      action: locked ? 'USER_LOCKED' : 'USER_UNLOCKED',
      user: req.admin,
      targetRecord: id,
      result: 'SUCCESS',
      ipAddress: ip,
    });

    res.json({
      success: true,
      message: `User account has been ${locked ? 'locked' : 'unlocked'}.`,
      isLocked: locked,
    });
  } catch (error) {
    console.error('Error toggling user lock:', error);
    res.status(500).json({ message: 'Failed to update account lock state.', error: error.message });
  }
};

/**
 * @desc    Admin reset user password
 * @route   POST /api/users/:id/reset-password
 * @access  Private (USER_RESET_PASSWORD permission)
 */
export const adminResetPassword = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { id } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const strength = validatePasswordStrength(newPassword);
  if (!strength.valid) {
    return res.status(400).json({ message: strength.message });
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await salesforceService.updateRecord('Website_User__c', id, {
      Password_Hash__c: passwordHash,
      Account_Locked__c: false,
      Failed_Login_Attempts__c: 0,
      Password_Reset_Token__c: null,
      Password_Reset_Expiry__c: null,
    });

    auditService.logEvent({
      action: 'ADMIN_PASSWORD_RESET',
      user: req.admin,
      targetRecord: id,
      result: 'SUCCESS',
      ipAddress: ip,
    });

    res.json({ success: true, message: 'Password has been successfully updated.' });
  } catch (error) {
    console.error('Error resetting password in Salesforce:', error);
    res.status(500).json({ message: 'Failed to update password.', error: error.message });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private (USER_DELETE permission)
 */
export const deleteUser = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { id } = req.params;

  try {
    // Prevent user from deleting their own active account
    if (req.admin?.id === id) {
      return res.status(400).json({ message: 'You cannot delete your own active administrator account.' });
    }

    await salesforceService.deleteRecord('Website_User__c', id);

    auditService.logEvent({
      action: 'USER_DELETED',
      user: req.admin,
      targetRecord: id,
      result: 'SUCCESS',
      ipAddress: ip,
    });

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user from Salesforce:', error);
    res.status(500).json({ message: 'Failed to delete user.', error: error.message });
  }
};
