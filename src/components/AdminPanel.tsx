import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Save, Image as ImageIcon, Utensils, Calendar, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
  onUpdateDish: (dish: Dish) => void;
  onDeleteDish: (id: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, dishes, onAddDish, onUpdateDish, onDeleteDish }) => {
  const [activeTab, setActiveTab] = useState<'productos' | 'viandas' | 'horarios' | 'contacto'>('productos');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Dish, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Viandas',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      onUpdateDish({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      onAddDish(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', description: '', price: 0, category: 'Viandas', image: '' });
  };

  const startEdit = (dish: Dish) => {
    setEditingId(dish.id);
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category: dish.category,
      image: dish.image || ''
    });
    setIsAdding(true);
  };

  const tabs = [
    { id: 'productos', label: 'Productos', icon: <Utensils size={16} /> },
    { id: 'viandas', label: 'Viandas', icon: <Calendar size={16} /> },
    { id: 'horarios', label: 'Horarios', icon: <Clock size={16} /> },
    { id: 'contacto', label: 'Contacto', icon: <Phone size={16} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#FAF5ED] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#E8906A]/20 flex items-center justify-between bg-white">
              <h2 className="font-serif text-2xl text-[#8B3A1A]">Panel de Administración</h2>
              <button onClick={onClose} className="text-[#8B3A1A] hover:bg-[#F0E8D8] p-2 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="flex bg-white border-b border-[#E8906A]/10 px-6 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id ? 'border-[#C06030] text-[#C06030]' : 'border-transparent text-[#5C3317] opacity-60'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'productos' && (
                isAdding ? (
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8906A]/20 space-y-6">
                    <h3 className="font-bold text-[#8B3A1A] text-xl">{editingId !== null ? 'Editar Plato' : 'Nuevo Plato'}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#5C3317]">Nombre</label>
                        <input required className="w-full p-3 rounded-xl border border-[#E8906A]/30 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#5C3317]">Precio ($)</label>
                        <input type="number" required className="w-full p-3 rounded-xl border border-[#E8906A]/30 outline-none" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-[#5C3317]">Descripción</label>
                        <textarea required className="w-full p-3 rounded-xl border border-[#E8906A]/30 outline-none h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#5C3317]">Categoría</label>
                        <select className="w-full p-3 rounded-xl border border-[#E8906A]/30 outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option>Viandas</option>
                          <option>Clásicos</option>
                          <option>Saludable</option>
                          <option>Postres</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="flex-1 bg-[#C06030] text-white py-3 rounded-xl font-bold hover:bg-[#8B3A1A] transition-colors flex items-center justify-center gap-2"><Save size={20} /> Guardar</button>
                      <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="flex-1 bg-gray-100 text-[#5C3317] py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <p className="text-[#5C3317] font-medium">{dishes.length} platos en el menú</p>
                      <button onClick={() => setIsAdding(true)} className="bg-[#4A6741] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#3a5233] transition-colors flex items-center gap-2 shadow-md"><Plus size={20} /> Nuevo Plato</button>
                    </div>
                    <div className="grid gap-4">
                      {dishes.map(dish => (
                        <div key={dish.id} className="bg-white p-4 rounded-2xl border border-[#E8906A]/10 flex items-center gap-4 shadow-sm">
                          <div className="w-12 h-12 bg-[#F0E8D8] rounded-xl flex items-center justify-center text-[#C06030]">{dish.image ? <img src={dish.image} className="w-full h-full object-cover" /> : <ImageIcon size={20} />}</div>
                          <div className="flex-1"><h4 className="font-bold text-[#3A2210]">{dish.name}</h4><p className="text-xs text-[#C06030] font-bold uppercase">${dish.price}</p></div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(dish)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                            <button onClick={() => onDeleteDish(dish.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
              {activeTab !== 'productos' && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8906A]/20 text-center py-20">
                  <p className="text-[#5C3317] opacity-60 italic">Esta sección se gestiona automáticamente desde la base de datos en la versión final.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;