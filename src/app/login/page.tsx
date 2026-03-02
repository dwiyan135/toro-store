'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/actions/auth';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(username, password);
      if (result.error) {
        setError(result.error);
      } else {
        if (result.role === 'ADMIN') router.push('/admin');
        else router.push('/reseller');
      }
    } catch {
      setError('Terjadi kesalahan sistem, coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 font-sans selection:bg-blue-500/30">
      {/* Decorative blur */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-500/25">
            <i className="fa-solid fa-store" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Toro Store</h1>
          <p className="text-neutral-500">
            {from === 'admin' ? 'Login Admin Panel' : from === 'reseller' ? 'Login Reseller Dashboard' : 'Masuk ke akun Anda'}
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl shadow-black/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                <i className="fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-neutral-600"
                  placeholder="masukkan username"
                  required
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-neutral-600 tracking-widest font-mono"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-3.5 px-4 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <i className="fa-solid fa-arrow-right-to-bracket transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-neutral-500 hover:text-white transition-colors flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-left" /> Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
