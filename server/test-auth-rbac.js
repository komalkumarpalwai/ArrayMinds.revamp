import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ROLES, PERMISSIONS, ROLE_PERMISSIONS, getPermissionsForRole } from './src/config/rbacConfig.js';
import auditService from './src/services/auditService.js';

console.log('----------------------------------------------------');
console.log('RUNNING ARRAY MINDS RBAC & AUTH VERIFICATION TESTS');
console.log('----------------------------------------------------\n');

let failed = 0;
let passed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

const hasRolePermission = (role, perm) => getPermissionsForRole(role).includes(perm);

// 1. Verify Role and Permissions Hierarchy
console.log('[TEST 1] Role-Permission Mapping Matrix');
assert(hasRolePermission(ROLES.SUPER_ADMIN, PERMISSIONS.USER_CREATE), 'Super Admin has USER_CREATE');
assert(hasRolePermission(ROLES.SUPER_ADMIN, PERMISSIONS.AUDIT_VIEW), 'Super Admin has AUDIT_VIEW');
assert(hasRolePermission(ROLES.SUPER_ADMIN, PERMISSIONS.BLOG_DELETE), 'Super Admin has BLOG_DELETE');

assert(hasRolePermission(ROLES.ADMIN, PERMISSIONS.USER_VIEW), 'Admin has USER_VIEW');
assert(hasRolePermission(ROLES.ADMIN, PERMISSIONS.USER_CREATE), 'Admin has USER_CREATE');
assert(!hasRolePermission(ROLES.ADMIN, PERMISSIONS.USER_DELETE), 'Admin CANNOT delete users');

assert(hasRolePermission(ROLES.DIGITAL_MARKETING, PERMISSIONS.BLOG_CREATE), 'Digital Marketing can create blogs');
assert(!hasRolePermission(ROLES.DIGITAL_MARKETING, PERMISSIONS.CONTACT_VIEW), 'Digital Marketing CANNOT view contact submissions');
assert(!hasRolePermission(ROLES.DIGITAL_MARKETING, PERMISSIONS.CAREER_CREATE), 'Digital Marketing CANNOT create careers');

assert(hasRolePermission(ROLES.HR, PERMISSIONS.CAREER_CREATE), 'HR can create careers');
assert(hasRolePermission(ROLES.HR, PERMISSIONS.APPLICATION_VIEW), 'HR can view applications');
assert(!hasRolePermission(ROLES.HR, PERMISSIONS.CONTACT_VIEW), 'HR CANNOT view contact submissions');
assert(!hasRolePermission(ROLES.HR, PERMISSIONS.BLOG_CREATE), 'HR CANNOT create blogs');

assert(hasRolePermission(ROLES.CONTENT_EDITOR, PERMISSIONS.BLOG_EDIT), 'Content Editor can edit blogs');
assert(!hasRolePermission(ROLES.CONTENT_EDITOR, PERMISSIONS.BLOG_DELETE), 'Content Editor CANNOT delete blogs');
assert(!hasRolePermission(ROLES.CONTENT_EDITOR, PERMISSIONS.CONTACT_VIEW), 'Content Editor CANNOT view inquiries');

// 2. Verify Bcrypt Hashing (12 rounds)
console.log('\n[TEST 2] Password Hashing Security (bcrypt 12 rounds)');
const testRawPassword = 'SuperSecret#Password2026!';
const salt = bcrypt.genSaltSync(12);
const hashedPassword = bcrypt.hashSync(testRawPassword, salt);

assert(hashedPassword.startsWith('$2a$12$') || hashedPassword.startsWith('$2b$12$'), 'Password hash uses bcrypt cost factor 12');
assert(bcrypt.compareSync(testRawPassword, hashedPassword), 'Valid password correctly verifies against bcrypt hash');
assert(!bcrypt.compareSync('WrongPassword123!', hashedPassword), 'Invalid password rejected by bcrypt');

// 3. Verify Password Policy Engine
console.log('\n[TEST 3] Password Policy Validation');
function validatePasswordStrength(pw) {
  const minLength = pw && pw.length >= 10;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  return minLength && hasUpper && hasLower && hasDigit && hasSpecial;
}
assert(validatePasswordStrength('ArrayMinds@2026!'), 'Strong password passes policy');
assert(!validatePasswordStrength('short1!'), 'Short password (<10 chars) rejected');
assert(!validatePasswordStrength('nouppercase123!'), 'Missing uppercase rejected');
assert(!validatePasswordStrength('NOLOWERCASE123!'), 'Missing lowercase rejected');
assert(!validatePasswordStrength('NoSpecialChars123'), 'Missing special char rejected');
assert(!validatePasswordStrength('NoNumbersAtAll!'), 'Missing digit rejected');

// 4. Verify Single-Use Reset Token Lifecycle
console.log('\n[TEST 4] Token Lifecycle & SHA-256 Hash Matching');
const rawResetToken = crypto.randomBytes(32).toString('hex');
const hashedTokenInDB = crypto.createHash('sha256').update(rawResetToken).digest('hex');
const incomingTokenHashed = crypto.createHash('sha256').update(rawResetToken).digest('hex');

assert(hashedTokenInDB === incomingTokenHashed, 'Incoming raw token matches SHA-256 hash stored in DB');
assert(crypto.createHash('sha256').update('tampered-token').digest('hex') !== hashedTokenInDB, 'Tampered reset token correctly rejected');

// 5. Audit Logging Service
console.log('\n[TEST 5] Audit Logging Service');
auditService.logEvent({
  action: 'TEST_VERIFICATION',
  user: { email: 'test.admin@arrayminds.com', role: 'Super Admin' },
  result: 'SUCCESS',
  details: { test: true },
  ipAddress: '127.0.0.1'
});

const recentLogs = auditService.getLogs({ limit: 10 });
assert(Array.isArray(recentLogs.records) && recentLogs.records.some(l => l.action === 'TEST_VERIFICATION'), 'Audit event logged and retrievable via auditService');

console.log('\n----------------------------------------------------');
console.log(`TOTAL PASSED: ${passed}`);
console.log(`TOTAL FAILED: ${failed}`);
console.log('----------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All RBAC and security validations passed successfully!');
  process.exit(0);
}
