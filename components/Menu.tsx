import React, { useMemo } from 'react';
import { Product, Category } from '../types';
import MenuItem from './MenuItem';

interface MenuProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const Menu: React.FC<MenuProps> = ({ products, onAddToCart }) => {
  const categorizedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<Category, Product[]>);
  }, [products]);

  const categoryOrder = [Category.Bolos, Category.Salgados, Category.Bebidas, Category.Outros];

  return (
    <div className="space-y-12">
      {categoryOrder.map(category => (
        categorizedProducts[category] && (
          <section key={category} id={category.toLowerCase()}>
            <h2 className="text-3xl font-bold text-brand-brown mb-6 border-b-2 border-brand-light-brown pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedProducts[category].map(product => (
                <MenuItem key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default Menu;