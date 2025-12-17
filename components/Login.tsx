import React, { useState } from 'react';
import { Heart, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, isAdmin: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Cek Kredensial Admin
    if (email === 'rahman@gmail.com' && password === 'rahman135') {
      onLogin(email, true); // True artinya Admin
      return;
    }

    // Cek Pengunjung Biasa (Semua Gmail)
    if (email.includes('@gmail.com')) {
      if (password.length > 0) {
         onLogin(email, false); // False artinya Pengunjung
      } else {
         setError('Mohon isi kata sandinya ya! 💕');
      }
      return;
    }

    setError('Mohon gunakan alamat @gmail.com yang valid! 💕');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl w-full max-w-md border-4 border-pink-200 relative overflow-hidden">
        {/* Dekorasi Lingkaran */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-block p-4 rounded-full bg-pink-50 mb-4 animate-bounce">
            <Heart className="w-12 h-12 text-pink-500 fill-current" />
          </div>
          <h1 className="font-handwriting text-4xl text-gray-800 mb-2">Selamat Datang, Cinta!</h1>
          <p className="text-gray-500">
            Masuk untuk melihat kisah kami.<br/>
            <span className="text-xs text-pink-400">(Admin mengedit, Pengunjung melihat)</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">Email (Gmail)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-pink-300 h-5 w-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 outline-none transition-all bg-pink-50 text-gray-900 placeholder-gray-400"
                placeholder="nama@gmail.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">Kata Sandi (Terlihat)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-pink-300 h-5 w-5" />
              {/* Type text agar terlihat */}
              <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 outline-none transition-all bg-pink-50 text-gray-900 placeholder-gray-400"
                placeholder="ketik sandi disini..."
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium animate-pulse">{error}</p>}

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Buka Hatiku
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;