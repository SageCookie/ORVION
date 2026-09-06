import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Product, Category } from '../types';
import { Plus, Search, Package, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    categoryId: 1,
    description: '',
    costPrice: 50,
    sellingPrice: 120,
    reorderLevel: 15,
    unit: 'pcs',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [query]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products', { params: { query } });
      setProducts(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/products/categories');
      setCategories(res.data.data);
      if (res.data.data.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: res.data.data[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        ...formData,
        sku: formData.sku || `SKU-${Date.now() % 100000}`,
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
        reorderLevel: Number(formData.reorderLevel),
      });
      toast.success('Product catalog item added');
      setShowModal(false);
      fetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Product Catalog</h1>
          <p className="text-sm text-slate-400 mt-1">Manage manufactured goods, raw materials, SKUs, and pricing margins</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search product catalog by SKU, name, or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none text-sm text-white placeholder-slate-400"
        />
      </div>

      {/* Glass Table */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">SKU</th>
              <th className="table-th">Product Name</th>
              <th className="table-th">Category</th>
              <th className="table-th">Cost Price</th>
              <th className="table-th">Selling Price</th>
              <th className="table-th">Reorder Lvl</th>
              <th className="table-th">Unit</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{p.sku}</td>
                <td className="table-td font-semibold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-400" />
                  {p.name}
                </td>
                <td className="table-td text-xs text-slate-300">{p.category?.name}</td>
                <td className="table-td text-xs font-mono text-slate-400">${p.costPrice?.toFixed(2)}</td>
                <td className="table-td font-bold text-emerald-400 font-mono">${p.sellingPrice?.toFixed(2)}</td>
                <td className="table-td text-xs font-mono text-slate-400">{p.reorderLevel}</td>
                <td className="table-td text-xs text-slate-400 uppercase">{p.unit}</td>
                <td className="table-td">
                  <span className={p.status === 'ACTIVE' ? 'badge-green' : 'badge-gray'}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Glass Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="glass-modal w-full max-w-lg p-6 space-y-4 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white">Add Catalog Product</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">SKU *</label>
                  <input required className="input" value={formData.sku} onChange={e=>setFormData({...formData, sku:e.target.value})} placeholder="e.g. SKU-10492" />
                </div>
                <div>
                  <label className="label">Category *</label>
                  <select className="input" value={formData.categoryId} onChange={e=>setFormData({...formData, categoryId:Number(e.target.value)})}>
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Product Name *</label>
                <input required className="input" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} placeholder="High Precision Sensor Module" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">Cost ($)</label>
                  <input required type="number" step="0.01" className="input" value={formData.costPrice} onChange={e=>setFormData({...formData, costPrice:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="label">Selling ($)</label>
                  <input required type="number" step="0.01" className="input" value={formData.sellingPrice} onChange={e=>setFormData({...formData, sellingPrice:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="label">Reorder Lvl</label>
                  <input required type="number" className="input" value={formData.reorderLevel} onChange={e=>setFormData({...formData, reorderLevel:Number(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="label">Description</label>
                <input className="input" value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} placeholder="Hardware unit specs" />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
