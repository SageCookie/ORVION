import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Invoice, Order } from '../types';
import { Plus, Search, Download, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(1);

  useEffect(() => {
    fetchInvoices();
    fetchOrders();
  }, [query]);

  const fetchInvoices = async () => {
    try {
      const res = await api.get('/invoices', { params: { query } });
      setInvoices(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data.content);
      if (res.data.data.content.length > 0) {
        setSelectedOrderId(res.data.data.content[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/invoices/from-order/${selectedOrderId}`);
      toast.success('Invoice generated successfully');
      setShowModal(false);
      fetchInvoices();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to generate invoice');
    }
  };

  const downloadPdf = async (id: number, invNo: string) => {
    try {
      const res = await api.get(`/invoices/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${invNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success(`Downloaded ${invNo}.pdf`);
    } catch (err) {
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Invoicing & Receivables</h1>
          <p className="text-sm text-slate-400 mt-1">Generate tax invoices, calculate balance due with BigDecimal precision, and export OpenPDF copies</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Generate Invoice
        </button>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search by invoice number or customer name..."
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
              <th className="table-th">Invoice #</th>
              <th className="table-th">Customer</th>
              <th className="table-th">Issue Date</th>
              <th className="table-th">Due Date</th>
              <th className="table-th">Grand Total</th>
              <th className="table-th">Paid</th>
              <th className="table-th">Balance Due</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.map((inv) => (
              <tr key={inv.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{inv.invoiceNumber}</td>
                <td className="table-td font-semibold text-white">{inv.customer?.companyName}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{inv.issueDate}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{inv.dueDate}</td>
                <td className="table-td font-bold text-white font-mono">${inv.grandTotal?.toFixed(2)}</td>
                <td className="table-td text-emerald-400 font-semibold font-mono">${inv.paidAmount?.toFixed(2)}</td>
                <td className="table-td font-bold text-rose-400 font-mono">${inv.balanceDue?.toFixed(2)}</td>
                <td className="table-td">
                  <span className={
                    inv.status === 'PAID' ? 'badge-green' :
                    inv.status === 'PARTIALLY_PAID' ? 'badge-blue' : 'badge-yellow'
                  }>
                    {inv.status}
                  </span>
                </td>
                <td className="table-td text-right">
                  <button onClick={() => downloadPdf(inv.id, inv.invoiceNumber)} className="btn-secondary text-xs py-1 px-3">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
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
              <h2 className="text-lg font-bold text-white">Generate Invoice from Order</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleGenerate} className="space-y-3.5">
              <div>
                <label className="label">Target Sales Order *</label>
                <select className="input" value={selectedOrderId} onChange={e=>setSelectedOrderId(Number(e.target.value))}>
                  {orders.map(o => <option key={o.id} value={o.id} className="bg-slate-900 text-white">{o.orderNumber} - {o.customer?.companyName} (${o.grandTotal?.toFixed(2)})</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Generate Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
