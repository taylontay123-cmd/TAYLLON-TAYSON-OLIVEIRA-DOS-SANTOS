export enum Category {
  Bolos = 'Bolos',
  Bebidas = 'Bebidas',
  Salgados = 'Salgados',
  Outros = 'Outros',
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: Category;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}
