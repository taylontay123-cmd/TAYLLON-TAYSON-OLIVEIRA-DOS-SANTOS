import React from 'react';
import { Product } from '../types';
import { PlusCircleIcon } from './icons/Icons';

interface MenuItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 duration-300">
      <img
        src={product.imageUrl || 'https://placehold.co/600x400/D2B48C/7b3f00?text=Amor+in+Doces'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-brand-brown mb-2">{product.name}</h3>
        {product.description && <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-brand-brown">R$ {product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center space-x-2 bg-brand-light-brown text-white px-4 py-2 rounded-full hover:bg-brand-light-brown-dark transition-colors duration-200"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <PlusCircleIcon />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;