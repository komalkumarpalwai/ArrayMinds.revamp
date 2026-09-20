import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles, KeyRound } from 'lucide-react';
import api from '../../../services/api';
import logoImg from '../../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';
import SEO from '../../../components/common/SEO';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [resetTokenDebug, setResetTokenDebug] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
      if (res.data?.resetToken) {
        setResetTokenDebug(res.data.resetToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process password reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white font-sans">
      <SEO title="Forgot Password | ArrayMinds Admin" noIndex={true} />

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
            <span>Back to Login</span>
          </Link>
          <span className="text-[11px] font-mono text-[#8A99B5]">Account Recovery</span>
        </div>

        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00C2CB]/20 text-[#7FE4EA] mx-auto shadow-inner">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Reset Password
            </h1>
            <p className="text-xs text-[#C7CDDA] font-light leading-relaxed">
              Enter your registered administrator email address. If an account exists in Salesforce, a secure reset token will be created.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="space-y-5 text-center">
              <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-semibold text-white">Reset Instructions Dispatched</p>
                <p>
                  If an active account exists for <strong>{email}</strong>, a password reset authorization has been recorded.
                </p>
              </div>

              {resetTokenDebug && (
                <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/30 text-left space-y-2">
                  <span className="text-[10px] font-bold text-purple-300 uppercase">Direct Reset Link:</span>
                  <Link
                    to={`/admin/reset-password?token=${resetTokenDebug}`}
                    className="block text-xs font-mono text-[#7FE4EA] underline break-all"
                  >
                    /admin/reset-password?token={resetTokenDebug}
                  </Link>
                </div>
              )}

              <Link
                to={`/admin/reset-password${resetTokenDebug ? `?token=${resetTokenDebug}` : ''}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#00C2CB] hover:bg-[#7FE4EA] text-[#032B2E] text-xs font-bold transition-all shadow-lg"
              >
                <span>Proceed to Password Reset</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#C7CDDA]">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8A99B5] absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@arrayminds.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-slate-300/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#00C2CB] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl text-sm font-bold text-[#032B2E] shadow-lg transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed text-white'
                    : 'bg-[#00C2CB] hover:bg-[#7FE4EA]'
                }`}
              >
                {loading ? <span>Generating Token...</span> : <span>Send Reset Instructions</span>}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
