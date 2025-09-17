import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-brand-brown mb-6">Acesso ADM</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-light-brown focus:border-brand-light-brown"
            required
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-brown bg-gray-200 hover:bg-gray-300"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-light-brown hover:bg-brand-light-brown-dark"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;