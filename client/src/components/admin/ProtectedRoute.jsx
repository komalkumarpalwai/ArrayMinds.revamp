import React from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredPermission, requiredPermissions }) => {
  const { isAuthenticated, loading, admin, hasPermission, hasAnyPermission } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1128] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00C2CB] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-[#8A99B5]">Verifying authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check single permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white/[0.04] border border-red-500/20 text-center space-y-5 shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">403 Forbidden</h2>
            <p className="text-xs text-red-200 mt-1.5 leading-relaxed">
              Your assigned role (<strong>{admin?.role || 'User'}</strong>) lacks the required permission (<code className="font-mono text-[11px] bg-red-950/60 px-1.5 py-0.5 rounded text-red-300">{requiredPermission}</code>) to access this administrative module.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C2CB] hover:bg-[#7FE4EA] text-[#032B2E] text-xs font-bold transition-all shadow-md shadow-[#00C2CB]/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check array of permissions (user must have at least one)
  if (requiredPermissions && requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white/[0.04] border border-red-500/20 text-center space-y-5 shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">403 Forbidden</h2>
            <p className="text-xs text-red-200 mt-1.5 leading-relaxed">
              Access restricted: You do not have permission to view this section.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C2CB] hover:bg-[#7FE4EA] text-[#032B2E] text-xs font-bold transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
