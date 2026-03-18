import React from 'react';
import { X, Trash2, Send, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const message = items.map(item => `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})`).join('%0A');
    const whatsappUrl = `https://wa.me/59899000000?text=Hola! Quisiera hacer un pedido:%0A${message}%0A%0ATotal: $${total}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#FAF5ED] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-[#E8906A]/20 flex items-center justify-between bg-white">
              <h2 className="font-serif text-2xl text-[#8B3A1A] flex items-center gap-2">
                <ShoppingBag className="text-[#C06030]" /> Tu Pedido
              </h2>
              <button onClick={onClose} className="text-[#8B3A1A] hover:bg-[#F0E8D8] p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-[#F0E8D8] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={32} className="text-[#C06030] opacity-50" />
                  </div>
                  <p className="text-[#5C3317] font-medium">Tu carrito está vacío</p>
                  <button onClick={onClose} className="mt-4 text-[#C06030] font-bold text-sm underline">Ver el menú</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-[#E8906A]/10">
                    <div className="flex-1">
                      <h4 className="font-bold text-[#3A2210]">{item.name}</h4>
                      <p className="text-[#C06030] font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-[#F0E8D8] rounded-lg px-2">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-[#8B3A1A]">-</button>
                        <span className="w-8 text-center font-bold text-[#3A2210]">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-[#8B3A1A]">+</button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E8906A]/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#5C3317] font-medium">Total a pagar:</span>
                  <span className="text-3xl font-bold text-[#C06030]">${total}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1da851] transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-3"
                >
                  <Send size={20} /> Enviar por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;