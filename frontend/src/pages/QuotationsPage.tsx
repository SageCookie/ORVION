import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Quotation, Customer, Product } from '../types';
import { Plus, Search, ArrowRight, Download, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [customerId, setCustomerId] = useState(1);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [notes, setNotes] = useState('Standard 30-day quotation terms');
  const [lineItems, setLineItems] = useState<{ productId: number; quantity: number; unitPrice: number; discount: number }[]>([
    { productId: 1, quantity: 10, unitPrice: 150, discount: 0 }
  ]);

  useEffect(() => {
    fetchQuotations();
    fetchCustomers();
    fetchProducts();
  }, [query]);

  const fetchQuotations = async () => {
    try {
      const res = await api.get('/quotations', { params: { query } });
      setQuotations(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers');
      setCustomers(res.data.data.content);
      if (res.data.data.content.length > 0) {
        setCustomerId(res.data.data.content[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/all');
      setProducts(res.data.data);
      if (res.data.data.length > 0) {
        setLineItems([{ productId: res.data.data[0].id, quantity: 5, unitPrice: res.data.data[0].sellingPrice, discount: 0 }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/quotations', {
        customerId,
        discountAmount: Number(discountAmount),
        notes,
        items: lineItems.map(item => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          discount: Number(item.discount),
        }))
      });
      toast.success('Quotation generated');
      setShowModal(false);
      fetchQuotations();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create quotation');
    }
  };

  const handleConvert = async (id: number) => {
    try {
      await api.post(`/quotations/${id}/convert`);
      toast.success('Quotation converted to Sales Order!');
      fetchQuotations();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Conversion failed');
    }
  };

  const downloadPdf = async (id: number, quoteNo: string) => {
    try {
      const res = await api.get(`/quotations/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${quoteNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success(`Downloaded ${quoteNo}.pdf`);
    } catch (err) {
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Quotations & Proposals</h1>
          <p className="text-sm text-slate-400 mt-1">Generate sales quotes, export OpenPDF documents, and convert to confirmed orders in 1 click</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Create Quotation
        </button>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search by quotation number or customer company..."
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
              <th className="table-th">Quote #</th>
              <th className="table-th">Customer</th>
              <th className="table-th">Issue Date</th>
              <th className="table-th">Valid Until</th>
              <th className="table-th">Grand Total</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {quotations.map((q) => (
              <tr key={q.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{q.quotationNumber}</td>
                <td className="table-td font-semibold text-white">{q.customer?.companyName}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{q.issueDate}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{q.validUntil}</td>
                <td className="table-td font-bold text-white font-mono">${q.grandTotal?.toFixed(2)}</td>
                <td className="table-td">
                  <span className={
                    q.status === 'CONVERTED' ? 'badge-green' :
                    q.status === 'SENT' ? 'badge-blue' : 'badge-yellow'
                  }>
                    {q.status}
                  </span>
                </td>
                <td className="table-td text-right space-x-2">
                  <button onClick={() => downloadPdf(q.id, q.quotationNumber)} className="btn-secondary text-xs py-1 px-3">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  {q.status !== 'CONVERTED' && (
                    <button onClick={() => handleConvert(q.id)} className="btn-primary text-xs py-1 px-3">
                      <ArrowRight className="w-3.5 h-3.5" /> Convert to Order
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
          <div className="glass-modal w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white">Create Sales Quotation</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="label">Select Client Customer *</label>
                <select className="input" value={customerId} onChange={e=>setCustomerId(Number(e.target.value))}>
                  {customers.map(c => <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.companyName} ({c.contactName})</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="label">Quotation Line Items</label>
                {lineItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2.5 items-center bg-white/[0.03] p-3 rounded-xl border border-white/10">
                    <div className="col-span-2">
                      <select className="input" value={item.productId} onChange={e => {
                        const pid = Number(e.target.value);
                        const prod = products.find(p => p.id === pid);
                        const updated = [...lineItems];
                        updated[idx] = { ...updated[idx], productId: pid, unitPrice: prod?.sellingPrice || 100 };
                        setLineItems(updated);
                      }}>
                        {products.map(p => <option key={p.id} value={p.id} className="bg-slate-900 text-white">{p.name} (${p.sellingPrice})</option>)}
                      </select>
                    </div>
                    <div>
                      <input type="number" min="1" className="input" placeholder="Qty" value={item.quantity} onChange={e => {
                        const updated = [...lineItems];
                        updated[idx].quantity = Number(e.target.value);
                        setLineItems(updated);
                      }} />
                    </div>
                    <div>
                      <input type="number" step="0.01" className="input" placeholder="Unit Price" value={item.unitPrice} onChange={e => {
                        const updated = [...lineItems];
                        updated[idx].unitPrice = Number(e.target.value);
                        setLineItems(updated);
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Overall Discount ($)</label>
                  <input type="number" step="0.01" className="input" value={discountAmount} onChange={e=>setDiscountAmount(Number(e.target.value))} />
                </div>
                <div>
                  <label className="label">Quotation Notes</label>
                  <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Generate Quotation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
