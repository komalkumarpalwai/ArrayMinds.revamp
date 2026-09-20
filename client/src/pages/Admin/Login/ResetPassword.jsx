import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import api from '../../../services/api';
import SEO from '../../../components/common/SEO';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const rules = {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const isPasswordValid = Object.values(rules).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('A valid reset token is required.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password does not meet the complexity requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.post('/auth/reset-password', {
        token,
        password,
        confirmPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Token may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white font-sans">
      <SEO title="Set New Password | ArrayMinds Admin" noIndex={true} />

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Back Link */}
        <div className="flex justify-between items-center px-1">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7FE4EA] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Login</span>
          </Link>
          <span className="text-[11px] font-mono text-[#8A99B5]">Security Vault</span>
        </div>

        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs text-[#C7CDDA] font-light leading-relaxed">
              Your new password must satisfy enterprise security policies before activation.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="space-y-5 text-center">
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-base font-bold text-white">Password Updated Successfully</p>
                <p>
                  Your new password is now active in Salesforce. You may proceed to sign in to the Admin Console.
                </p>
              </div>

              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#00C2CB] hover:bg-[#7FE4EA] text-[#032B2E] text-xs font-bold transition-all shadow-lg"
              >
                <span>Sign In to Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* Reset Token Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#C7CDDA]">
                  Reset Authorization Token *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paste your 64-character reset token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white placeholder-slate-300/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                />
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#C7CDDA]">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8A99B5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password (min 12 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-300/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A99B5] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Rules Checklist */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] space-y-1">
                <span className="font-bold text-[#8A99B5] block mb-1">Password Complexity Checklist:</span>
                <div className="grid grid-cols-2 gap-1">
                  <span className={`flex items-center gap-1.5 ${rules.length ? 'text-emerald-400 font-semibold' : 'text-[#8A99B5]'}`}>
                    {rules.length ? <Check className="w-3 h-3" /> : '•'} 12+ Characters
                  </span>
                  <span className={`flex items-center gap-1.5 ${rules.upper ? 'text-emerald-400 font-semibold' : 'text-[#8A99B5]'}`}>
                    {rules.upper ? <Check className="w-3 h-3" /> : '•'} Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${rules.lower ? 'text-emerald-400 font-semibold' : 'text-[#8A99B5]'}`}>
                    {rules.lower ? <Check className="w-3 h-3" /> : '•'} Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${rules.number ? 'text-emerald-400 font-semibold' : 'text-[#8A99B5]'}`}>
                    {rules.number ? <Check className="w-3 h-3" /> : '•'} Number
                  </span>
                  <span className={`flex items-center gap-1.5 ${rules.special ? 'text-emerald-400 font-semibold' : 'text-[#8A99B5]'}`}>
                    {rules.special ? <Check className="w-3 h-3" /> : '•'} Special Symbol
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#C7CDDA]">
                  Confirm New Password *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-300/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !isPasswordValid}
                className={`w-full py-3.5 rounded-xl text-sm font-bold text-[#032B2E] shadow-lg transition-all flex items-center justify-center gap-2 ${
                  loading || !isPasswordValid
                    ? 'bg-gray-500 cursor-not-allowed text-white'
                    : 'bg-[#00C2CB] hover:bg-[#7FE4EA]'
                }`}
              >
                {loading ? <span>Updating Password...</span> : <span>Update Password</span>}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
