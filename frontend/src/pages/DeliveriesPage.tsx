import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Delivery, Order } from '../types';
import { Plus, Truck, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    orderId: 1,
    driverName: 'Fleet Carrier Alpha',
    vehicleNumber: 'TRK-9901',
    deliveryAddress: '100 Tech Blvd, Suite 400',
    estimatedArrival: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
  });

  useEffect(() => {
    fetchDeliveries();
    fetchOrders();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await api.get('/deliveries');
      setDeliveries(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data.content);
      if (res.data.data.content.length > 0) {
        setFormData(prev => ({ ...prev, orderId: res.data.data.content[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/deliveries', {
        ...formData,
        estimatedArrival: new Date(formData.estimatedArrival).toISOString(),
      });
      toast.success('Delivery dispatch scheduled');
      setShowModal(false);
      fetchDeliveries();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Dispatch creation failed');
    }
  };

  const handleDeliver = async (id: number) => {
    try {
      await api.patch(`/deliveries/${id}/status`, null, { params: { status: 'DELIVERED' } });
      toast.success('Marked as Delivered');
      fetchDeliveries();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Status update failed');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Logistics & Dispatches</h1>
          <p className="text-sm text-slate-400 mt-1">Waybill tracking, carrier allocation, and doorstep delivery verification</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Schedule Dispatch
        </button>
      </div>

      {/* Glass Table */}
      <div className="table-container">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="table-th">Waybill #</th>
              <th className="table-th">Order #</th>
              <th className="table-th">Customer</th>
              <th className="table-th">Carrier / Vehicle</th>
              <th className="table-th">Destination</th>
              <th className="table-th">ETA</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {deliveries.map((del) => (
              <tr key={del.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{del.deliveryNumber}</td>
                <td className="table-td font-semibold text-white">{del.order?.orderNumber}</td>
                <td className="table-td text-slate-300">{del.order?.customer?.companyName}</td>
                <td className="table-td text-xs text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-cyan-400" />
                  {del.assignedDriverName || 'Carrier Alpha'} ({del.trackingNumber || 'TRK-AUTO'})
                </td>
                <td className="table-td text-xs text-slate-400 truncate max-w-[150px]">{del.deliveryAddress}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{del.dispatchDate?.slice(0, 10) || 'Today'}</td>
                <td className="table-td">
                  <span className={
                    del.status === 'DELIVERED' ? 'badge-green' :
                    del.status === 'IN_TRANSIT' ? 'badge-blue' : 'badge-yellow'
                  }>
                    {del.status}
                  </span>
                </td>
                <td className="table-td text-right">
                  {del.status !== 'DELIVERED' && (
                    <button onClick={() => handleDeliver(del.id)} className="btn-secondary text-xs py-1 px-3">
                      Mark Delivered
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
              <h2 className="text-lg font-bold text-white">Schedule Order Dispatch</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="label">Select Confirmed Order *</label>
                <select className="input" value={formData.orderId} onChange={e=>setFormData({...formData, orderId:Number(e.target.value)})}>
                  {orders.map(o => <option key={o.id} value={o.id} className="bg-slate-900 text-white">{o.orderNumber} - {o.customer?.companyName}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Driver / Carrier *</label>
                  <input required className="input" value={formData.driverName} onChange={e=>setFormData({...formData, driverName:e.target.value})} />
                </div>
                <div>
                  <label className="label">Vehicle Plate / Flight *</label>
                  <input required className="input" value={formData.vehicleNumber} onChange={e=>setFormData({...formData, vehicleNumber:e.target.value})} />
                </div>
              </div>
              <div>
                <label className="label">Delivery Street Address *</label>
                <input required className="input" value={formData.deliveryAddress} onChange={e=>setFormData({...formData, deliveryAddress:e.target.value})} />
              </div>
              <div>
                <label className="label">Estimated Arrival Date & Time *</label>
                <input required type="datetime-local" className="input" value={formData.estimatedArrival} onChange={e=>setFormData({...formData, estimatedArrival:e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Schedule Dispatch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
