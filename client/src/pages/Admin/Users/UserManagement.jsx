import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Shield, 
  Lock, 
  Unlock, 
  KeyRound, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Users, 
  Eye, 
  EyeOff, 
  Building2, 
  Clock, 
  X,
  Check,
  UserCheck,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import LogoLoader from '../../../components/common/LogoLoader';

const UserManagement = () => {
  const { admin, hasPermission } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Dropdown options from backend
  const [availableRoles, setAvailableRoles] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalUser, setEditModalUser] = useState(null);
  const [resetModalUser, setResetModalUser] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Form states for Create User
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    department: 'Cloud & Salesforce Engineering',
    status: 'Active',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states for Edit User
  const [editFormData, setEditFormData] = useState({
    role: '',
    department: '',
    status: '',
  });

  // Form states for Reset Password
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const showToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (departmentFilter) params.append('department', departmentFilter);

      const res = await api.get(`/users?${params.toString()}`);
      setUsers(res.data.users || []);
      if (res.data.availableRoles) setAvailableRoles(res.data.availableRoles);
      if (res.data.availableDepartments) setAvailableDepartments(res.data.availableDepartments);
    } catch (err) {
      console.error('Error loading users:', err);
      setError(err.response?.data?.message || 'Failed to load users from Salesforce.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter, departmentFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  // Password rules validation helper
  const checkPasswordRules = (pwd) => ({
    length: pwd.length >= 10,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
  });

  const createRules = checkPasswordRules(formData.password);
  const isCreatePasswordValid = Object.values(createRules).every(Boolean);

  const resetRules = checkPasswordRules(resetPasswordData.newPassword);
  const isResetPasswordValid = Object.values(resetRules).every(Boolean);

  // 1. Create User Submit
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!isCreatePasswordValid) {
      setModalError('Password does not meet the complexity requirements.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setModalError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setModalError(null);
    try {
      await api.post('/users', {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        department: formData.department,
        status: formData.status,
      });

      showToast(`User ${formData.username} created successfully in Salesforce.`);
      setCreateModalOpen(false);
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        role: availableRoles[0] || 'Admin',
        department: availableDepartments[0] || 'Cloud & Salesforce Engineering',
        status: 'Active',
      });
      fetchUsers();
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to create user in Salesforce.');
    } finally {
      setSubmitting(false);
    }
  };

  // 2. Edit User Submit
  const handleEditUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setModalError(null);
    try {
      await api.put(`/users/${editModalUser.id}`, editFormData);
      showToast(`User ${editModalUser.username} updated successfully.`);
      setEditModalUser(null);
      fetchUsers();
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to update user.');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Reset Password Submit
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isResetPasswordValid) {
      setModalError('New password does not meet security requirements.');
      return;
    }
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      setModalError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setModalError(null);
    try {
      await api.post(`/users/${resetModalUser.id}/reset-password`, {
        newPassword: resetPasswordData.newPassword,
      });
      showToast(`Password for ${resetModalUser.username} reset successfully.`);
      setResetModalUser(null);
      fetchUsers();
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Toggle Status (Activate/Deactivate)
  const executeToggleStatus = async (user, newStatus) => {
    try {
      await api.patch(`/users/${user.id}/status`, { status: newStatus });
      showToast(`User ${user.username} has been ${newStatus.toLowerCase()}d.`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user status.');
    } finally {
      setConfirmDialog(null);
    }
  };

  // 5. Toggle Lock
  const executeToggleLock = async (user, newLockedState) => {
    try {
      await api.patch(`/users/${user.id}/lock`, { locked: newLockedState });
      showToast(`User ${user.username} has been ${newLockedState ? 'locked' : 'unlocked'}.`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lock state.');
    } finally {
      setConfirmDialog(null);
    }
  };

  // 6. Delete User
  const executeDeleteUser = async (user) => {
    try {
      await api.delete(`/users/${user.id}`);
      showToast(`User ${user.username} removed successfully.`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user.');
    } finally {
      setConfirmDialog(null);
    }
  };

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'super admin':
        return 'bg-purple-100 text-[#2D1B54] border-purple-200';
      case 'admin':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'digital marketing':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hr':
        return 'bg-pink-50 text-[#EC1557] border-pink-200';
      case 'content editor':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const lockedUsers = users.filter((u) => u.isLocked).length;

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#2D1B54] text-white font-semibold text-xs shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#6C4AB6] border border-purple-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Salesforce Website_User__c Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#2D1B54]">
            User Administration
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage website admin accounts, roles, security lockouts, and permissions in Salesforce CRM.
          </p>
        </div>

        {hasPermission('USER_CREATE') && (
          <button
            onClick={() => {
              setError(null);
              setCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EC1557] hover:bg-[#d0104a] text-white text-xs font-bold transition-all shadow-md shadow-[#EC1557]/20 self-start sm:self-auto transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New User</span>
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Users</span>
          <p className="text-3xl font-black text-[#2D1B54]">{totalUsers}</p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Active Accounts</span>
          <p className="text-3xl font-black text-emerald-600">{activeUsers}</p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Locked Accounts</span>
          <p className={`text-3xl font-black ${lockedUsers > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
            {lockedUsers}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6] transition-all"
          />
        </form>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
        >
          <option value="">All Roles</option>
          {availableRoles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Refresh */}
        <button
          onClick={fetchUsers}
          className="px-4 py-2.5 rounded-xl bg-[#F8F9FD] hover:bg-gray-100 text-[#2D1B54] text-xs font-bold border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
          title="Refresh List"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#EC1557]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16">
            <LogoLoader text="Connecting to Salesforce user directory..." size="sm" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto text-[#6C4AB6]">
              <Users className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-[#2D1B54]">No website users found</p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Adjust your search filters or click "Create New User" to provision your first authorized portal account.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8F9FD] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">User / Email</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-4">Department</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Security</th>
                  <th className="py-4 px-4">Last Login</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/75 transition-colors">
                    
                    {/* Username / Email */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#2D1B54]">{u.username}</div>
                      <div className="text-[10px] font-mono text-gray-400 mt-0.5">ID: {u.id}</div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getRoleBadge(u.role)}`}>
                        {u.role}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4 text-gray-600 font-medium">
                      {u.department}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Security / Lock */}
                    <td className="py-4 px-4">
                      {u.isLocked ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                          <Lock className="w-3 h-3 text-red-500" />
                          Locked ({u.failedAttempts})
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Normal
                        </span>
                      )}
                    </td>

                    {/* Last Login */}
                    <td className="py-4 px-4 text-gray-500 text-[11px] font-mono">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        
                        {/* Edit Role/Dept */}
                        {hasPermission('USER_EDIT') && (
                          <button
                            onClick={() => {
                              setEditModalUser(u);
                              setEditFormData({
                                role: u.role,
                                department: u.department,
                                status: u.status,
                              });
                            }}
                            className="p-2 rounded-xl bg-[#F8F9FD] hover:bg-purple-50 text-gray-600 hover:text-[#6C4AB6] border border-gray-200 transition-colors"
                            title="Edit Role & Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Reset Password */}
                        {hasPermission('USER_RESET_PASSWORD') && (
                          <button
                            onClick={() => {
                              setResetModalUser(u);
                              setResetPasswordData({ newPassword: '', confirmPassword: '' });
                            }}
                            className="p-2 rounded-xl bg-[#F8F9FD] hover:bg-amber-50 text-gray-600 hover:text-amber-700 border border-gray-200 transition-colors"
                            title="Reset Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Toggle Lock */}
                        {hasPermission('USER_EDIT') && (
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                title: u.isLocked ? 'Unlock User Account' : 'Lock User Account',
                                message: u.isLocked
                                  ? `Are you sure you want to unlock account for ${u.username}? This resets failed login counters.`
                                  : `Are you sure you want to lock account for ${u.username}? The user will be barred from signing in.`,
                                confirmLabel: u.isLocked ? 'Unlock Account' : 'Lock Account',
                                confirmColor: u.isLocked ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700',
                                onConfirm: () => executeToggleLock(u, !u.isLocked),
                              });
                            }}
                            className={`p-2 rounded-xl border transition-colors ${
                              u.isLocked
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-[#F8F9FD] text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                            title={u.isLocked ? 'Unlock Account' : 'Lock Account'}
                          >
                            {u.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          </button>
                        )}

                        {/* Toggle Active / Inactive */}
                        {hasPermission('USER_EDIT') && (
                          <button
                            onClick={() => {
                              const targetStatus = u.isActive ? 'Inactive' : 'Active';
                              setConfirmDialog({
                                title: `${targetStatus} User Account`,
                                message: `Are you sure you want to change ${u.username}'s status to ${targetStatus}?`,
                                confirmLabel: `${targetStatus} Account`,
                                confirmColor: u.isActive ? 'bg-gray-700 hover:bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700',
                                onConfirm: () => executeToggleStatus(u, targetStatus),
                              });
                            }}
                            className={`p-2 rounded-xl border transition-colors ${
                              u.isActive
                                ? 'bg-[#F8F9FD] text-gray-600 border-gray-200 hover:bg-gray-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            }`}
                            title={u.isActive ? 'Deactivate Account' : 'Activate Account'}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete User (Super Admin only) */}
                        {hasPermission('USER_DELETE') && (
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                title: 'Permanently Delete User',
                                message: `Are you sure you want to permanently delete user ${u.username}? This record will be deleted from Salesforce and cannot be undone.`,
                                confirmLabel: 'Delete Permanently',
                                confirmColor: 'bg-red-600 hover:bg-red-700',
                                onConfirm: () => executeDeleteUser(u),
                              });
                            }}
                            className="p-2 rounded-xl bg-[#F8F9FD] hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: CREATE USER */}
      {/* ========================================================================= */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D1B54]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6C4AB6]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#2D1B54]">Create Website User</h3>
                  <p className="text-xs text-gray-500">Creates record in Salesforce Website_User__c</p>
                </div>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-left">
              {/* Username / Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                  Username / Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="employee@arrayminds.com"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6] transition-all"
                />
              </div>

              {/* Role & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
                  >
                    {availableRoles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
                  >
                    {availableDepartments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter strong password (min 10 characters)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B54]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Rules Checklist */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-200 text-[11px] space-y-1.5">
                <span className="font-bold text-gray-700 block text-xs">Password Policy Requirements:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <span className={`flex items-center gap-1.5 ${createRules.length ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {createRules.length ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} 10+ Characters
                  </span>
                  <span className={`flex items-center gap-1.5 ${createRules.upper ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {createRules.upper ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${createRules.lower ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {createRules.lower ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${createRules.number ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {createRules.number ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Number
                  </span>
                  <span className={`flex items-center gap-1.5 ${createRules.special ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {createRules.special ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Special Symbol
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                  Confirm Password *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6] transition-all"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isCreatePasswordValid}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
                    submitting || !isCreatePasswordValid
                      ? 'bg-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-[#EC1557] hover:bg-[#d0104a] shadow-[#EC1557]/20 transform hover:-translate-y-0.5'
                  }`}
                >
                  {submitting ? 'Creating User...' : 'Create User'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT USER */}
      {/* ========================================================================= */}
      {editModalUser && (
        <div className="fixed inset-0 z-50 bg-[#2D1B54]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-[#2D1B54]">Edit User</h3>
                <p className="text-xs text-gray-500">{editModalUser.username}</p>
              </div>
              <button onClick={() => setEditModalUser(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleEditUser} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Role</label>
                <select
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
                >
                  {availableRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Department</label>
                <select
                  value={editFormData.department}
                  onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
                >
                  {availableDepartments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Account Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] font-medium focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditModalUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#2D1B54] hover:bg-[#3D256D] text-white text-xs font-bold transition-all shadow-md"
                >
                  {submitting ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESET PASSWORD */}
      {/* ========================================================================= */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 bg-[#2D1B54]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-[#2D1B54]">Reset Password</h3>
                <p className="text-xs text-gray-500">For user: {resetModalUser.username}</p>
              </div>
              <button onClick={() => setResetModalUser(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={resetPasswordData.newPassword}
                  onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6] transition-all"
                />
              </div>

              {/* Password Rules Checklist */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-200 text-[11px] space-y-1.5">
                <span className="font-bold text-gray-700 block text-xs">Password Policy Requirements:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <span className={`flex items-center gap-1.5 ${resetRules.length ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {resetRules.length ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} 10+ Characters
                  </span>
                  <span className={`flex items-center gap-1.5 ${resetRules.upper ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {resetRules.upper ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${resetRules.lower ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {resetRules.lower ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${resetRules.number ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {resetRules.number ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Number
                  </span>
                  <span className={`flex items-center gap-1.5 ${resetRules.special ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                    {resetRules.special ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 text-center">•</span>} Special Symbol
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={resetPasswordData.confirmPassword}
                  onChange={(e) => setResetPasswordData({ ...resetPasswordData, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#2D1B54] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#6C4AB6] focus:ring-1 focus:ring-[#6C4AB6] transition-all"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setResetModalUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isResetPasswordValid}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
                    submitting || !isResetPasswordValid
                      ? 'bg-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-[#EC1557] hover:bg-[#d0104a] shadow-[#EC1557]/20'
                  }`}
                >
                  {submitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 bg-[#2D1B54]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 text-left">
            <h3 className="text-lg font-black text-[#2D1B54]">{confirmDialog.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{confirmDialog.message}</p>
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-md ${confirmDialog.confirmColor}`}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
