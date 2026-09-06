import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Customer } from '../types';
import { Plus, Search, Building, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    taxId: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, [query]);

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers', { params: { query } });
      setCustomers(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/customers', formData);
      toast.success('Customer added successfully');
      setShowModal(false);
      fetchCustomers();
      setFormData({ companyName: '', contactName: '', email: '', phone: '', taxId: '', addressLine1: '', city: '', state: '', postalCode: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create customer');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Customer Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Manage enterprise client records, tax IDs, and billing contacts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Glass Search Bar */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search by company name, customer code, contact, or city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none text-sm text-white placeholder-slate-400"
        />
      </div>

      {/* Glass Table Container */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">Customer Code</th>
              <th className="table-th">Company</th>
              <th className="table-th">Contact</th>
              <th className="table-th">Email & Phone</th>
              <th className="table-th">Location</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((c) => (
              <tr key={c.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{c.customerCode}</td>
                <td className="table-td font-semibold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" />
                  {c.companyName}
                </td>
                <td className="table-td text-slate-300">{c.contactName}</td>
                <td className="table-td">
                  <div className="text-xs text-slate-200">{c.email}</div>
                  <div className="text-xs text-slate-400 font-mono">{c.phone}</div>
                </td>
                <td className="table-td text-xs text-slate-400">{c.city}, {c.state}</td>
                <td className="table-td">
                  <span className={c.status === 'ACTIVE' ? 'badge-green' : 'badge-gray'}>{c.status}</span>
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
              <h2 className="text-lg font-bold text-white">Add New Customer</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="label">Company Name *</label>
                <input required className="input" value={formData.companyName} onChange={e=>setFormData({...formData, companyName:e.target.value})} placeholder="e.g. Apex Robotics Corp" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Contact Person *</label>
                  <input required className="input" value={formData.contactName} onChange={e=>setFormData({...formData, contactName:e.target.value})} placeholder="Full name" />
                </div>
                <div>
                  <label className="label">Tax ID / GST</label>
                  <input className="input" value={formData.taxId} onChange={e=>setFormData({...formData, taxId:e.target.value})} placeholder="TX-9902" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Email *</label>
                  <input required type="email" className="input" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} placeholder="contact@corp.com" />
                </div>
                <div>
                  <label className="label">Phone *</label>
                  <input required className="input" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="label">Street Address *</label>
                <input required className="input" value={formData.addressLine1} onChange={e=>setFormData({...formData, addressLine1:e.target.value})} placeholder="100 Tech Blvd, Suite 400" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">City</label>
                  <input className="input" value={formData.city} onChange={e=>setFormData({...formData, city:e.target.value})} placeholder="San Jose" />
                </div>
                <div>
                  <label className="label">State</label>
                  <input className="input" value={formData.state} onChange={e=>setFormData({...formData, state:e.target.value})} placeholder="CA" />
                </div>
                <div>
                  <label className="label">Postal Code</label>
                  <input className="input" value={formData.postalCode} onChange={e=>setFormData({...formData, postalCode:e.target.value})} placeholder="95134" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
