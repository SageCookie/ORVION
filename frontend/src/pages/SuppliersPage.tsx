import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Supplier } from '../types';
import { Plus, Search, Building2, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    taxId: '',
    address: '',
  });

  useEffect(() => {
    fetchSuppliers();
  }, [query]);

  const fetchSuppliers = async () => {
    try {
      const res = await api.get('/suppliers', { params: { query } });
      setSuppliers(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/suppliers', formData);
      toast.success('Supplier added successfully');
      setShowModal(false);
      fetchSuppliers();
      setFormData({ name: '', contactName: '', email: '', phone: '', taxId: '', address: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create supplier');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Supplier Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Vendor management and raw material procurement contacts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search suppliers by vendor name or supplier code..."
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
              <th className="table-th">Supplier Code</th>
              <th className="table-th">Vendor Name</th>
              <th className="table-th">Contact</th>
              <th className="table-th">Email & Phone</th>
              <th className="table-th">Address</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {suppliers.map((s) => (
              <tr key={s.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{s.supplierCode}</td>
                <td className="table-td font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {s.name}
                </td>
                <td className="table-td text-slate-300">{s.contactName}</td>
                <td className="table-td">
                  <div className="text-xs text-white">{s.email}</div>
                  <div className="text-xs text-slate-400 font-mono">{s.phone}</div>
                </td>
                <td className="table-td text-xs text-slate-400 truncate max-w-[150px]">{s.address}</td>
                <td className="table-td">
                  <span className={s.status === 'ACTIVE' ? 'badge-green' : 'badge-gray'}>{s.status}</span>
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
              <h2 className="text-lg font-bold text-white">Add New Supplier</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="label">Vendor / Company Name *</label>
                <input required className="input" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} placeholder="Acme Components Ltd" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Contact Person *</label>
                  <input required className="input" value={formData.contactName} onChange={e=>setFormData({...formData, contactName:e.target.value})} />
                </div>
                <div>
                  <label className="label">Tax ID / VAT</label>
                  <input className="input" value={formData.taxId} onChange={e=>setFormData({...formData, taxId:e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Email *</label>
                  <input required type="email" className="input" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
                </div>
                <div>
                  <label className="label">Phone *</label>
                  <input required className="input" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
                </div>
              </div>
              <div>
                <label className="label">Address</label>
                <input className="input" value={formData.address} onChange={e=>setFormData({...formData, address:e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
