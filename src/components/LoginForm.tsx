'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(password);

    if (success) {
      setPassword('');
      router.push('/band/schedule');
    } else {
      setError('パスワードが正しくありません');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="vintage-card p-8">
        <h1 className="text-[1.5rem] font-serif text-fg mb-2">
          バンドメンバー専用エリア
        </h1>
        <p className="text-fg-muted text-[0.85rem] mb-6">
          パスワードを入力してアクセス
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-[0.8rem] text-fg-muted uppercase tracking-wider mb-2"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent transition-colors"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900 bg-opacity-30 border border-red-700 text-red-200 text-[0.85rem] rounded-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full px-6 py-3 mt-6 border border-accent text-accent hover:bg-accent hover:text-card-bg transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '確認中...' : 'アクセス'}
          </button>
        </form>
      </div>
    </div>
  );
}
