import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { AuditLog } from '../types';
import { ShieldAlert, Search } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [query]);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/audit-logs', { params: { query } });
      setLogs(res.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          Security & Operational Audit Trail
          <ShieldAlert className="w-5 h-5 text-indigo-400" />
        </h1>
        <p className="text-sm text-slate-400 mt-1">Immutable security log recording all state transitions, financial movements, and administrative events</p>
      </div>

      {/* Glass Search */}
      <div className="glass-panel p-3.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Filter audit events by actor email, action, entity type, or record ID..."
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
              <th className="table-th">Timestamp</th>
              <th className="table-th">User / Actor</th>
              <th className="table-th">Action</th>
              <th className="table-th">Entity Type</th>
              <th className="table-th">Target ID</th>
              <th className="table-th">Details & Security Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="table-row">
                <td className="table-td text-xs text-slate-400 font-mono">{log.timestamp}</td>
                <td className="table-td font-semibold text-white text-xs">{log.userEmail}</td>
                <td className="table-td">
                  <span className="badge-purple font-mono text-[10px]">{log.action}</span>
                </td>
                <td className="table-td text-xs text-slate-300 font-mono">{log.entityName}</td>
                <td className="table-td font-mono font-bold text-indigo-400 text-xs">{log.entityId}</td>
                <td className="table-td text-xs text-slate-300 max-w-md truncate">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
