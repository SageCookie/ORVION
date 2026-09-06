import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { QualityCheck, ProductionOrder } from '../types';
import { Plus, CheckSquare, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QualityPage() {
  const [checks, setChecks] = useState<QualityCheck[]>([]);
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productionOrderId: 1,
    inspectorName: 'Quality Lead Tech',
    inspectedQuantity: 100,
    passedQuantity: 98,
    rejectedQuantity: 2,
    defectNotes: 'Minor surface scratch within tolerance',
  });

  useEffect(() => {
    fetchChecks();
    fetchProductionOrders();
  }, []);

  const fetchChecks = async () => {
    try {
      const res = await api.get('/quality-checks');
      setChecks(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductionOrders = async () => {
    try {
      const res = await api.get('/production/orders');
      setProductionOrders(res.data.data.content);
      if (res.data.data.content.length > 0) {
        setFormData(prev => ({ ...prev, productionOrderId: res.data.data.content[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/quality-checks', {
        ...formData,
        inspectedQuantity: Number(formData.inspectedQuantity),
        passedQuantity: Number(formData.passedQuantity),
        rejectedQuantity: Number(formData.rejectedQuantity),
      });
      toast.success('Inspection record logged');
      setShowModal(false);
      fetchChecks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Inspection recording failed');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Quality Assurance & Inspections</h1>
          <p className="text-sm text-slate-400 mt-1">Log defect rates, tolerance certificates, and inspection yield</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Log QC Inspection
        </button>
      </div>

      {/* Glass Table */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">QC #</th>
              <th className="table-th">Production Job</th>
              <th className="table-th">Product</th>
              <th className="table-th">Inspected / Passed / Rejected</th>
              <th className="table-th">Inspector</th>
              <th className="table-th">Inspection Date</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {checks.map((qc) => (
              <tr key={qc.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{qc.checkNumber}</td>
                <td className="table-td font-semibold text-white">{qc.productionOrder?.productionNumber}</td>
                <td className="table-td text-slate-300">{qc.productionOrder?.product?.name}</td>
                <td className="table-td text-xs font-mono">
                  <span className="text-white font-bold">{qc.inspectedQuantity}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-emerald-400 font-bold">{qc.passedQuantity}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-rose-400 font-bold">{qc.rejectedQuantity}</span>
                </td>
                <td className="table-td text-xs text-slate-300 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                  {qc.inspectorName}
                </td>
                <td className="table-td text-xs text-slate-400 font-mono">{qc.inspectionDate}</td>
                <td className="table-td">
                  <span className={
                    qc.result === 'PASSED' ? 'badge-green' :
                    qc.result === 'REWORK_REQUIRED' ? 'badge-yellow' : 'badge-red'
                  }>
                    {qc.result}
                  </span>
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
              <h2 className="text-lg font-bold text-white">Log Quality Inspection</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="label">Target Production Batch *</label>
                <select className="input" value={formData.productionOrderId} onChange={e=>setFormData({...formData, productionOrderId:Number(e.target.value)})}>
                  {productionOrders.map(po => <option key={po.id} value={po.id} className="bg-slate-900 text-white">{po.productionNumber} - {po.product?.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="label">Inspected</label>
                  <input required type="number" min="1" className="input" value={formData.inspectedQuantity} onChange={e=>setFormData({...formData, inspectedQuantity:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="label">Passed</label>
                  <input required type="number" min="0" className="input" value={formData.passedQuantity} onChange={e=>setFormData({...formData, passedQuantity:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="label">Rejected</label>
                  <input required type="number" min="0" className="input" value={formData.rejectedQuantity} onChange={e=>setFormData({...formData, rejectedQuantity:Number(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="label">Inspector Signature / Name *</label>
                <input required className="input" value={formData.inspectorName} onChange={e=>setFormData({...formData, inspectorName:e.target.value})} />
              </div>
              <div>
                <label className="label">Defect Notes & Tolerance Metrics</label>
                <input className="input" value={formData.defectNotes} onChange={e=>setFormData({...formData, defectNotes:e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Record Inspection</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
