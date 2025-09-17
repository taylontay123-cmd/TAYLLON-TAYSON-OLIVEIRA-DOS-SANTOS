import React from 'react';
import { ShoppingCartIcon, UserCircleIcon, LogoutIcon } from './icons/Icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onAdminClick, isAdmin }) => {
  return (
    <header className="bg-brand-light-brown shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider" style={{fontFamily: "'Brush Script MT', cursive"}}>
          Amor in Doces
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={onAdminClick}
            className="flex items-center space-x-2 text-white hover:text-brand-cream transition-colors duration-200"
            aria-label={isAdmin ? "Sair do modo Admin" : "Acessar modo Admin"}
          >
            {isAdmin ? <LogoutIcon /> : <UserCircleIcon />}
            <span className="hidden md:inline">{isAdmin ? 'Sair' : 'Admin'}</span>
          </button>
          <button
            onClick={onCartClick}
            className="relative text-white hover:text-brand-cream transition-colors duration-200"
            aria-label={`Ver carrinho com ${cartItemCount} itens`}
          >
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;