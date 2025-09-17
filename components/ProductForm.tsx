import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.Bolos);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setDescription(product.description || '');
      setCategory(product.category);
      setImageUrl(product.imageUrl || '');
    } else {
        setName('');
        setPrice('');
        setDescription('');
        setCategory(Category.Bolos);
        setImageUrl('');
    }
  }, [product]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price: parseFloat(price) || 0,
      description,
      category,
      imageUrl,
    };
    if (product) {
        onSave({ ...productData, id: product.id });
    } else {
        onSave(productData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-brand-brown">{product ? 'Editar Produto' : 'Adicionar Produto'}</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Nome do Produto" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="number" placeholder="Preço" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" className="w-full p-2 border rounded" />
            <textarea placeholder="Descrição (opcional)" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded h-24"></textarea>
            <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full p-2 border rounded">
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
             <div>
              <label className="block text-sm font-medium text-gray-700">Imagem</label>
              <div className="mt-1 flex items-center space-x-4">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
                ) : (
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs text-center">
                    Sem Foto
                  </div>
                )}
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light-brown">
                    Escolher arquivo
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-brand-light-brown text-white rounded hover:bg-brand-light-brown-dark">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;