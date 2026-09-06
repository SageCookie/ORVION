import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Payment, Invoice } from '../types';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    invoiceId: 1,
    amount: 1000,
    paymentMethod: 'BANK_TRANSFER',
    transactionReference: '',
    notes: 'Settled via wire transfer',
  });

  useEffect(() => {
    fetchPayments();
    fetchInvoices();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await api.get('/payments');
      setPayments(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await api.get('/invoices');
      setInvoices(res.data.data.content);
      if (res.data.data.content.length > 0) {
        setFormData(prev => ({ ...prev, invoiceId: res.data.data.content[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/payments', {
        ...formData,
        amount: Number(formData.amount),
        transactionReference: formData.transactionReference || `TXN-${Date.now()}`
      });
      toast.success('Payment recorded and balance deducted');
      setShowModal(false);
      fetchPayments();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Payment processing failed');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Payment Receipts & Reconciliation</h1>
          <p className="text-sm text-slate-400 mt-1">Record incoming wire transfers, credit payments, and check reconciliations</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Record Payment
        </button>
      </div>

      {/* Glass Table */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">Payment #</th>
              <th className="table-th">Target Invoice #</th>
              <th className="table-th">Amount Received</th>
              <th className="table-th">Payment Method</th>
              <th className="table-th">Transaction Reference</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {payments.map((p) => (
              <tr key={p.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{p.paymentNumber}</td>
                <td className="table-td font-semibold text-white">{p.invoice?.invoiceNumber}</td>
                <td className="table-td font-bold text-emerald-400 font-mono">${p.amount?.toFixed(2)}</td>
                <td className="table-td text-xs text-slate-300">{p.paymentMethod}</td>
                <td className="table-td font-mono text-xs text-slate-400">{p.referenceNumber || 'REF-AUTO'}</td>
                <td className="table-td">
                  <span className={p.status === 'COMPLETED' ? 'badge-green' : 'badge-yellow'}>{p.status}</span>
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
              <h2 className="text-lg font-bold text-white">Record Incoming Payment</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRecord} className="space-y-3.5">
              <div>
                <label className="label">Select Invoice *</label>
                <select className="input" value={formData.invoiceId} onChange={e=>setFormData({...formData, invoiceId:Number(e.target.value)})}>
                  {invoices.map(inv => (
                    <option key={inv.id} value={inv.id} className="bg-slate-900 text-white">
                      {inv.invoiceNumber} - {inv.customer?.companyName} (Due: ${inv.balanceDue?.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Amount Paid ($) *</label>
                  <input required type="number" step="0.01" min="1" className="input" value={formData.amount} onChange={e=>setFormData({...formData, amount:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="label">Payment Method *</label>
                  <select className="input" value={formData.paymentMethod} onChange={e=>setFormData({...formData, paymentMethod:e.target.value})}>
                    <option value="BANK_TRANSFER" className="bg-slate-900 text-white">Bank Wire / Transfer</option>
                    <option value="CREDIT_CARD" className="bg-slate-900 text-white">Credit Card</option>
                    <option value="CHECK" className="bg-slate-900 text-white">Cheque / Draft</option>
                    <option value="CASH" className="bg-slate-900 text-white">Cash</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Transaction Reference #</label>
                <input className="input" value={formData.transactionReference} onChange={e=>setFormData({...formData, transactionReference:e.target.value})} placeholder="e.g. WIRE-899410" />
              </div>
              <div>
                <label className="label">Notes</label>
                <input className="input" value={formData.notes} onChange={e=>setFormData({...formData, notes:e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Post Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
