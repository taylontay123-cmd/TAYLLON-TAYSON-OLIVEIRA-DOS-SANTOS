
import React, { useState } from 'react';
import { Product } from '../types';
import ProductForm from './ProductForm';
import { PlusIcon, PencilIcon, TrashIcon } from './icons/Icons';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  addToast: (message: string, type: 'success' | 'error') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, addToast }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
        onDeleteProduct(productId);
    }
  };

  const handleFormSave = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      onUpdateProduct(productData as Product);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-brown">Gerenciar Cardápio</h2>
        <button onClick={handleAddClick} className="flex items-center space-x-2 bg-brand-light-brown text-white px-4 py-2 rounded-lg hover:bg-brand-light-brown-dark">
          <PlusIcon />
          <span>Adicionar Produto</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.imageUrl || 'https://placehold.co/40x40/D2B48C/7b3f00?text=?'} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">R$ {product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEditClick(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><PencilIcon /></button>
                  <button onClick={() => handleDeleteClick(product.id)} className="text-red-600 hover:text-red-900"><TrashIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleFormSave}
          onClose={() => setIsFormOpen(false)}
          addToast={addToast}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
