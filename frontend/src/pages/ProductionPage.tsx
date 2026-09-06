import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { ProductionOrder, Product } from '../types';
import { Plus, Play, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductionPage() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productId: 1,
    quantityToProduce: 100,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/production/orders');
      setOrders(res.data.data.content);
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/production/orders', {
        ...formData,
        quantityToProduce: Number(formData.quantityToProduce),
      });
      toast.success('Production order created');
      setShowModal(false);
      fetchOrders();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create production order');
    }
  };

  const handleStart = async (id: number) => {
    try {
      await api.post(`/production/orders/${id}/start`);
      toast.success('Production started on shop floor');
      fetchOrders();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to start production');
    }
  };

  const handleComplete = async (id: number, produced: number) => {
    try {
      await api.post(`/production/orders/${id}/complete`, null, { params: { produced, rejected: 0 } });
      toast.success('Production completed');
      fetchOrders();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to complete production');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Shop Floor Production</h1>
          <p className="text-sm text-slate-400 mt-1">Manage assembly batches, track progress yield, and feed finished stock into warehouse</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Launch Production Run
        </button>
      </div>

      {/* Glass Table */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">Job #</th>
              <th className="table-th">Product</th>
              <th className="table-th">Target Qty</th>
              <th className="table-th">Produced / Rejected</th>
              <th className="table-th">Schedule Window</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((po) => (
              <tr key={po.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{po.productionNumber}</td>
                <td className="table-td font-semibold text-white">{po.product?.name}</td>
                <td className="table-td font-bold text-white font-mono">{po.targetQuantity}</td>
                <td className="table-td text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{po.producedQuantity}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-rose-400 font-bold">{po.rejectedQuantity}</span>
                </td>
                <td className="table-td text-xs text-slate-400 font-mono">{po.startDate} → {po.expectedCompletionDate}</td>
                <td className="table-td">
                  <span className={
                    po.status === 'COMPLETED' ? 'badge-green' :
                    po.status === 'IN_PROGRESS' ? 'badge-blue' : 'badge-yellow'
                  }>
                    {po.status}
                  </span>
                </td>
                <td className="table-td text-right space-x-2">
                  {po.status === 'PLANNED' && (
                    <button onClick={() => handleStart(po.id)} className="btn-primary text-xs py-1 px-3">
                      <Play className="w-3.5 h-3.5" /> Start
                    </button>
                  )}
                  {po.status === 'IN_PROGRESS' && (
                    <button onClick={() => handleComplete(po.id, po.targetQuantity)} className="btn-secondary text-xs py-1 px-3">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Complete
                    </button>
                  )}
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
              <h2 className="text-lg font-bold text-white">Schedule Production Order</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="label">Target Product to Manufacture *</label>
                <select className="input" value={formData.productId} onChange={e=>setFormData({...formData, productId:Number(e.target.value)})}>
                  {products.map(p => <option key={p.id} value={p.id} className="bg-slate-900 text-white">{p.sku} - {p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Planned Quantity *</label>
                <input required type="number" min="1" className="input" value={formData.quantityToProduce} onChange={e=>setFormData({...formData, quantityToProduce:Number(e.target.value)})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Start Date *</label>
                  <input required type="date" className="input" value={formData.startDate} onChange={e=>setFormData({...formData, startDate:e.target.value})} />
                </div>
                <div>
                  <label className="label">Target End Date *</label>
                  <input required type="date" className="input" value={formData.endDate} onChange={e=>setFormData({...formData, endDate:e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Schedule Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
