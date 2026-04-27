import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050b14] relative overflow-hidden font-sans text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20">
        <div className="text-cyan-400 font-bold text-xl tracking-tighter flex items-center gap-2">
          Musicfy
        </div>
        <div className="flex items-center gap-8">
          <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Help Center</button>
          <Link to="/register" className="bg-cyan-400 hover:bg-cyan-300 text-[#050b14] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all">Sign Up</Link>
        </div>
      </header>

      {/* Waveform Background Placeholder */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/20 blur-sm transform -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-400 transform -translate-y-1/2 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        
        {/* Simple CSS Waveform animation */}
        <div className="flex items-center justify-around w-full h-64 absolute top-1/2 left-0 -translate-y-1/2 px-10">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i}
              className="w-[2px] bg-cyan-400/60 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 100 + 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[480px] p-10 rounded-[40px] bg-[#0c141d]/80 backdrop-blur-2xl border border-white/5 shadow-2xl mt-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome to Musicfy</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">Your Luminous Music Curator</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm text-center font-bold">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400/80 ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#151f2b] border border-white/5 rounded-2xl py-4 px-5 outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-gray-600"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-400/80">Password</label>
              <button type="button" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Forgot Password?</button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#151f2b] border border-white/5 rounded-2xl py-4 px-5 outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-gray-600"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#050b14] font-bold py-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <div className="flex items-center gap-4 mb-8 text-gray-600 uppercase text-[10px] tracking-[0.2em] font-bold">
            <div className="flex-1 h-px bg-white/5" />
            or connect via
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="flex justify-center gap-6">
            <button className="w-14 h-14 rounded-full bg-[#151f2b] border border-white/5 flex items-center justify-center hover:border-cyan-400/30 hover:bg-[#1a2635] transition-all">
              <Chrome size={24} className="text-white" />
            </button>
            <button className="w-14 h-14 rounded-full bg-[#151f2b] border border-white/5 flex items-center justify-center hover:border-cyan-400/30 hover:bg-[#1a2635] transition-all">
              <Github size={24} className="text-white" />
            </button>
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">Create a Musicfy Profile</Link>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-10 left-10 text-[10px] text-gray-600 uppercase tracking-widest font-medium">
        © 2024 Musicfy. The Luminous Curator Experience.
      </div>
      <div className="absolute bottom-10 right-10 flex gap-6 text-[10px] text-gray-600 uppercase tracking-widest font-medium">
        <button className="hover:text-white">Privacy</button>
        <button className="hover:text-white">Terms</button>
        <button className="hover:text-white">Cookie Policy</button>
      </div>
    </div>
  );
};

export default LoginPage;
