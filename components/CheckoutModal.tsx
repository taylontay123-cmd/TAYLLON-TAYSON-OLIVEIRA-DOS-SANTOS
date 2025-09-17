import React, { useState } from 'react';
import { XIcon } from './icons/Icons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { name: string; address: string; paymentMethod: string; }) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `Rua: ${street}, Nº: ${number}, Bairro: ${neighborhood}${complement ? `, Complemento: ${complement}` : ''}${reference ? `, Referência: ${reference}` : ''}`;
    onSubmit({ name, address: fullAddress, paymentMethod });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-y-auto">
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-brand-brown">Detalhes da Entrega</h2>
          <button onClick={onClose} aria-label="Fechar checkout"><XIcon/></button>
        </header>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
          <input type="text" placeholder="Rua" value={street} onChange={e => setStreet(e.target.value)} required className="w-full p-2 border rounded" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Número" value={number} onChange={e => setNumber(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="text" placeholder="Bairro" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <input type="text" placeholder="Complemento (opcional)" value={complement} onChange={e => setComplement(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Ponto de Referência (opcional)" value={reference} onChange={e => setReference(e.target.value)} className="w-full p-2 border rounded" />
          
          <div>
            <label className="block mb-2 font-semibold">Forma de Pagamento:</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
              <option value="Cartão">Cartão</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-brand-light-brown text-white py-3 rounded-lg font-bold text-lg hover:bg-brand-light-brown-dark transition-colors duration-200">
            Enviar Pedido via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;