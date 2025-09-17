import React from 'react';
import { CartItem } from '../types';
import { XIcon, PlusIcon, MinusIcon } from './icons/Icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  totalPrice: number;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, totalPrice, onCheckout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-brand-cream shadow-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 bg-brand-light-brown text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">Seu Carrinho</h2>
          <button onClick={onClose} aria-label="Fechar carrinho">
            <XIcon />
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Seu carrinho está vazio.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
                  <div className="flex-grow">
                    <p className="font-semibold text-brand-brown">{item.name}</p>
                    <p className="text-sm text-brand-brown">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                        <MinusIcon />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                        <PlusIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="p-4 border-t border-gray-200 bg-white">
          <div className="flex justify-between items-center mb-4 text-xl font-bold">
            <span className="text-gray-700">Total:</span>
            <span className="text-brand-brown">R$ {totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-brand-light-brown text-white py-3 rounded-lg font-bold text-lg hover:bg-brand-light-brown-dark transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Finalizar Pedido
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Cart;