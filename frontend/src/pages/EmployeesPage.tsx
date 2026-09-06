import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Employee } from '../types';
import { Plus, Search, UserCheck, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: 'OPERATIONS',
    designation: 'Specialist',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, [query]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees', { params: { query } });
      setEmployees(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/employees', formData);
      toast.success('Employee record created');
      setShowModal(false);
      fetchEmployees();
      setFormData({ firstName: '', lastName: '', department: 'OPERATIONS', designation: 'Specialist', email: '', phone: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create employee');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Staff & Workforce Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Staff assignments, technician scheduling, and operational department contacts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search workforce by name, code, department, or designation..."
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
              <th className="table-th">Staff Code</th>
              <th className="table-th">Full Name</th>
              <th className="table-th">Department</th>
              <th className="table-th">Designation</th>
              <th className="table-th">Email & Phone</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {employees.map((emp) => (
              <tr key={emp.id} className="table-row">
                <td className="table-td font-mono font-bold text-indigo-400">{emp.employeeCode}</td>
                <td className="table-td font-semibold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  {emp.firstName} {emp.lastName}
                </td>
                <td className="table-td">
                  <span className="badge-purple">{emp.department}</span>
                </td>
                <td className="table-td text-xs text-slate-300">{emp.designation}</td>
                <td className="table-td">
                  <div className="text-xs text-white">{emp.email}</div>
                  <div className="text-xs text-slate-400 font-mono">{emp.phone}</div>
                </td>
                <td className="table-td">
                  <span className={emp.status === 'ACTIVE' ? 'badge-green' : 'badge-gray'}>{emp.status}</span>
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
              <h2 className="text-lg font-bold text-white">Add Staff Member</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">First Name *</label>
                  <input required className="input" value={formData.firstName} onChange={e=>setFormData({...formData, firstName:e.target.value})} />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input required className="input" value={formData.lastName} onChange={e=>setFormData({...formData, lastName:e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Department *</label>
                  <select className="input" value={formData.department} onChange={e=>setFormData({...formData, department:e.target.value})}>
                    <option value="OPERATIONS" className="bg-slate-900 text-white">Operations</option>
                    <option value="SALES" className="bg-slate-900 text-white">Sales</option>
                    <option value="INVENTORY" className="bg-slate-900 text-white">Inventory & Warehouse</option>
                    <option value="PRODUCTION" className="bg-slate-900 text-white">Shop Floor Production</option>
                    <option value="QUALITY" className="bg-slate-900 text-white">Quality Assurance</option>
                    <option value="LOGISTICS" className="bg-slate-900 text-white">Logistics & Delivery</option>
                    <option value="FINANCE" className="bg-slate-900 text-white">Finance & Accounting</option>
                  </select>
                </div>
                <div>
                  <label className="label">Designation *</label>
                  <input required className="input" value={formData.designation} onChange={e=>setFormData({...formData, designation:e.target.value})} />
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
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={()=>setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
