import fs from 'fs';
import path from 'path';

class AuditService {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
    this.logFilePath = path.resolve(process.cwd(), 'audit.log');
  }

  /**
   * Log an administrative security or data modification event.
   * NEVER pass passwords, tokens, or secret hashes.
   */
  logEvent({
    action,
    user = null,
    targetRecord = null,
    result = 'SUCCESS',
    details = null,
    ipAddress = 'Unknown',
    userAgent = 'Unknown',
  }) {
    const entry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      action,
      user: user
        ? {
            id: user.id || user._id || 'unknown',
            email: user.email || user.Username__c || 'unknown',
            role: user.role || user.Role__c || 'Unknown',
          }
        : { email: 'Anonymous / System', role: 'None' },
      targetRecord: targetRecord || null,
      result,
      details: typeof details === 'string' ? details : details ? JSON.stringify(details) : null,
      ipAddress,
      userAgent: userAgent ? userAgent.substring(0, 150) : 'Unknown',
    };

    // Add to in-memory buffer
    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Append to file asynchronously
    try {
      const line = JSON.stringify(entry) + '\n';
      fs.appendFile(this.logFilePath, line, (err) => {
        if (err) {
          console.warn('Audit file write warning:', err.message);
        }
      });
    } catch (e) {
      // ignore
    }

    return entry;
  }

  /**
   * Retrieve audit logs with filtering and pagination
   */
  getLogs({ action, userEmail, result, limit = 50, offset = 0 } = {}) {
    let filtered = [...this.logs];

    if (action) {
      const q = action.toLowerCase();
      filtered = filtered.filter((l) => l.action.toLowerCase().includes(q));
    }

    if (userEmail) {
      const q = userEmail.toLowerCase();
      filtered = filtered.filter((l) => l.user?.email?.toLowerCase().includes(q));
    }

    if (result) {
      filtered = filtered.filter((l) => l.result.toLowerCase() === result.toLowerCase());
    }

    const total = filtered.length;
    const records = filtered.slice(offset, offset + limit);

    return {
      total,
      limit,
      offset,
      records,
    };
  }
}

const auditService = new AuditService();
export default auditService;
