import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Order } from '../types';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [query]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders', { params: { query } });
      setOrders(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/orders/${id}/status`, null, { params: { status } });
      toast.success(`Order status changed to ${status}`);
      fetchOrders();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update order status');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Sales & Operational Orders</h1>
        <p className="text-sm text-slate-400 mt-1">Confirmed customer orders feeding shop floor production and logistics</p>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search by order number or customer company name..."
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
              <th className="table-th">Order #</th>
              <th className="table-th">Customer</th>
              <th className="table-th">Order Date</th>
              <th className="table-th">Promised Delivery</th>
              <th className="table-th">Priority</th>
              <th className="table-th">Grand Total</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <tr key={o.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{o.orderNumber}</td>
                <td className="table-td font-semibold text-white">{o.customer?.companyName}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{o.orderDate}</td>
                <td className="table-td text-xs text-slate-400 font-mono">{o.promisedDeliveryDate}</td>
                <td className="table-td">
                  <span className={o.priority === 'HIGH' ? 'badge-red' : 'badge-gray'}>{o.priority}</span>
                </td>
                <td className="table-td font-bold text-white font-mono">${o.grandTotal?.toFixed(2)}</td>
                <td className="table-td">
                  <span className={
                    o.status === 'COMPLETED' ? 'badge-green' :
                    o.status === 'PROCESSING' || o.status === 'IN_PRODUCTION' ? 'badge-blue' : 'badge-yellow'
                  }>
                    {o.status}
                  </span>
                </td>
                <td className="table-td text-right">
                  <select
                    value={o.status}
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                    className="text-xs border border-white/15 rounded-lg px-2.5 py-1.5 bg-slate-900/80 backdrop-blur-xl text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="PENDING" className="bg-slate-900 text-white">PENDING</option>
                    <option value="PROCESSING" className="bg-slate-900 text-white">PROCESSING</option>
                    <option value="IN_PRODUCTION" className="bg-slate-900 text-white">IN_PRODUCTION</option>
                    <option value="SHIPPED" className="bg-slate-900 text-white">SHIPPED</option>
                    <option value="COMPLETED" className="bg-slate-900 text-white">COMPLETED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
