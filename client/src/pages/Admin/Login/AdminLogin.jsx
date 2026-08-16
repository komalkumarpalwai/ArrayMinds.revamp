import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import logoImg from '../../../assets/Array Minds_edited_edited.avif';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E113F] via-[#2D1B54] to-[#4E2F94] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white font-sans">
      
      {/* Background Decorative Glow Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#EC1557]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#6C4AB6]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Back Link */}
        <div className="flex justify-between items-center px-1">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-200 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Public Website</span>
          </Link>
          <span className="text-[11px] font-mono text-purple-300">Secure Portal v2.0</span>
        </div>

        {/* Login Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl space-y-8">
          
          {/* Header & Logo */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-white shadow-md">
              <img 
                src={logoImg} 
                alt="Array Minds" 
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Admin Console
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 mt-1 font-light">
                Sign in to manage submissions, careers, and content
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-200 flex items-start gap-3 text-xs sm:text-sm animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-purple-300 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@arrayminds.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-purple-300/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#EC1557] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-300 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-purple-300/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#EC1557] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all transform flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#EC1557] hover:bg-[#d0104a] shadow-[#EC1557]/40 hover:-translate-y-0.5 active:scale-95'
              }`}
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Security Notice */}
          <div className="pt-2 border-t border-white/10 text-center">
            <p className="text-[11px] text-purple-200/70 flex items-center justify-center gap-1.5 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>JWT Encrypted & Protected Session</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
