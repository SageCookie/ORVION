import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Inventory, Product } from '../types';
import { Plus, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStock, setLowStock] = useState<Inventory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productId: 1,
    type: 'STOCK_IN',
    quantity: 50,
    locationRack: 'RACK-A1',
  });

  useEffect(() => {
    fetchInventory();
    fetchLowStock();
    fetchProducts();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await api.get('/inventory');
      setInventory(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLowStock = async () => {
    try {
      const res = await api.get('/inventory/low-stock');
      setLowStock(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/all');
      setProducts(res.data.data);
      if (res.data.data.length > 0) {
        setFormData(prev => ({ ...prev, productId: res.data.data[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/inventory/transactions', formData);
      toast.success('Stock adjustment recorded');
      setShowModal(false);
      fetchInventory();
      fetchLowStock();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed stock operation');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Inventory Ledger & Control</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time stock on hand, reservations, rack bins, and threshold alerts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Stock Adjustment
        </button>
      </div>

      {/* Glass Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="glass-panel p-4 bg-rose-500/10 border-rose-500/30 text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Low Stock Warning ({lowStock.length} items)</div>
              <div className="text-xs text-rose-300/80">
                Immediate reorder required: {lowStock.map(i => i.product?.name).join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Glass Table Container */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">Product SKU</th>
              <th className="table-th">Product Name</th>
              <th className="table-th">Location Rack</th>
              <th className="table-th">On Hand</th>
              <th className="table-th">Reserved</th>
              <th className="table-th">Available</th>
              <th className="table-th">Reorder Lvl</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {inventory.map((inv) => {
              const available = inv.quantityOnHand - inv.quantityReserved;
              const isLow = inv.quantityOnHand <= (inv.product?.reorderLevel || 10);
              return (
                <tr key={inv.id} className="table-row">
                  <td className="table-td font-mono font-bold text-indigo-400">{inv.product?.sku}</td>
                  <td className="table-td font-semibold text-white">{inv.product?.name}</td>
                  <td className="table-td font-mono text-xs text-slate-300">{inv.locationRack || 'MAIN-RACK'}</td>
                  <td className="table-td font-bold text-white font-mono">{inv.quantityOnHand} {inv.product?.unit}</td>
                  <td className="table-td text-slate-400 font-mono">{inv.quantityReserved}</td>
                  <td className="table-td font-bold text-emerald-400 font-mono">{available}</td>
                  <td className="table-td text-slate-400 font-mono">{inv.product?.reorderLevel}</td>
                  <td className="table-td">
                    <span className={isLow ? 'badge-red' : 'badge-green'}>
                      {isLow ? 'REORDER NOW' : 'HEALTHY'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Glass Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="glass-modal w-full max-w-lg p-6 space-y-4 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white">Record Stock Adjustment</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleTransaction} className="space-y-3.5">
              <div>
                <label className="label">Target Product *</label>
                <select className="input" value={formData.productId} onChange={e=>setFormData({...formData, productId:Number(e.target.value)})}>
                  {products.map(p => <option key={p.id} value={p.id} className="bg-slate-900 text-white">{p.sku} - {p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Adjustment Type *</label>
                  <select className="input" value={formData.type} onChange={e=>setFormData({...formData, type:e.target.value})}>
                    <option value="STOCK_IN" className="bg-slate-900 text-white">Stock In (Purchase/Production)</option>
                    <option value="STOCK_OUT" className="bg-slate-900 text-white">Stock Out (Shipment/Issue)</option>
                    <option value="ADJUSTMENT" className="bg-slate-900 text-white">Manual Override</option>
                  </select>
                </div>
                <div>
                  <label className="label">Quantity *</label>
                  <input required type="number" min="1" className="input" value={formData.quantity} onChange={e=>setFormData({...formData, quantity:Number(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="label">Warehouse Rack Location</label>
                <input className="input" value={formData.locationRack} onChange={e=>setFormData({...formData, locationRack:e.target.value})} placeholder="e.g. RACK-B2" />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Post Adjustment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
