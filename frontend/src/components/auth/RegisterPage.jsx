import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      console.error('Registration failed:', err);
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
          <Link to="/login" className="bg-cyan-400 hover:bg-cyan-300 text-[#050b14] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all">Sign In</Link>
        </div>
      </header>

      {/* Waveform Background Placeholder */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/20 blur-sm transform -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-400 transform -translate-y-1/2 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        
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

      <div className="relative z-10 w-full max-w-[480px] p-10 rounded-[40px] bg-[#0c141d]/80 backdrop-blur-2xl border border-white/5 shadow-2xl mt-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Create Profile</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">Join the Luminous Collective</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400/80 ml-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-[#151f2b] border border-white/5 rounded-2xl py-4 px-5 outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400/80 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#151f2b] border border-white/5 rounded-2xl py-4 px-5 outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400/80 ml-1">Password</label>
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
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#050b14] font-bold py-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'CREATING PROFILE...' : 'CREATE PROFILE'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
