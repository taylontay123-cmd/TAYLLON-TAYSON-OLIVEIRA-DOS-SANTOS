
import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, Category, ToastMessage } from './types';
import { initialProducts } from './data/db';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Header from './components/Header';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CheckoutModal from './components/CheckoutModal';
import Toasts from './components/Toasts';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('amorInDoces:products');
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      return initialProducts;
    }
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('amorInDoces:cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [view, setView] = useState<'menu' | 'adminLogin'>('menu');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('amorInDoces:products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('amorInDoces:cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    addToast(`${product.name} adicionado!`, 'success');
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleAdminLogin = (password: string) => {
    if (password === 'amor123') {
      setIsAdmin(true);
      setView('menu'); 
    } else {
      addToast('Senha incorreta!', 'error');
    }
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCart(prev => prev.filter(item => item.id !== productId));
  };
  
  const handleCheckout = (details: { name: string; address: string; paymentMethod: string; }) => {
    const phoneNumber = "5586981935470";
    const itemsText = cart.map(item => `- ${item.name} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const message = `
🍬 Pedido - Amor in Doces
Cliente: ${details.name}
Endereço: ${details.address}
Itens:
${itemsText}
Total: R$ ${totalPrice.toFixed(2)}
Forma de Pagamento: ${details.paymentMethod}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsCheckoutOpen(false);
    setCart([]);
  };

  const renderContent = () => {
    if (view === 'adminLogin') {
      return <AdminLogin onLogin={handleAdminLogin} onBack={() => setView('menu')} />;
    }
    if (isAdmin) {
      return <AdminDashboard 
        products={products}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />;
    }
    return <Menu products={products} onAddToCart={addToCart} />;
  }

  return (
    <div className="bg-brand-cream min-h-screen font-sans text-brand-brown">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => isAdmin ? setIsAdmin(false) : setView('adminLogin')}
        isAdmin={isAdmin}
      />
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onUpdateQuantity={updateQuantity}
        totalPrice={totalPrice}
        onCheckout={() => {
            if (cart.length > 0) {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }
        }}
      />
       <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
      />
      <Toasts toasts={toasts} />
    </div>
  );
};

export default App;