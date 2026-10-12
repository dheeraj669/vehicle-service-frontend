import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Wrench, 
  FileText, 
  Edit3, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function ServicesView({ 
  services, 
  onNewService, 
  onEditService, 
  onDeleteService, 
  onOpenStatusModal, 
  onViewInvoice 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredServices = services.filter((svc) => {
    // Status Filter
    if (statusFilter !== 'ALL' && svc.status !== statusFilter) {
      return false;
    }
    // Priority Filter
    if (priorityFilter !== 'ALL' && svc.priority !== priorityFilter) {
      return false;
    }
    // Search Query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchVehicle = svc.vehicle?.vehicleNumber?.toLowerCase().includes(q) ||
                           svc.vehicle?.make?.toLowerCase().includes(q) ||
                           svc.vehicle?.model?.toLowerCase().includes(q);
      const matchCustomer = svc.vehicle?.customer?.name?.toLowerCase().includes(q);
      const matchTech = svc.technicianName?.toLowerCase().includes(q);
      const matchDesc = svc.description?.toLowerCase().includes(q);
      const matchType = svc.serviceType?.toLowerCase().includes(q);
      return matchVehicle || matchCustomer || matchTech || matchDesc || matchType;
    }
    return true;
  });

  const statusTabs = [
    { id: 'ALL', label: 'All Jobs' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'WAITING_PARTS', label: 'Waiting Parts' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'DELIVERED', label: 'Delivered' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Quick Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            Service Job Orders & Maintenance
          </h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Track workshop work orders, allocate mechanics, update servicing stages, and print tax receipts
          </p>
        </div>

        <button className="btn btn-primary" onClick={onNewService}>
          <Plus size={16} /> Create Service Job
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {statusTabs.map((tab) => {
            const count = tab.id === 'ALL' 
              ? services.length 
              : services.filter(s => s.status === tab.id).length;
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #6366f1' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-secondary)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  padding: '0.1rem 0.4rem',
                  borderRadius: '9999px',
                  background: isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.1)',
                  fontSize: '0.7rem',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and Secondary Filter Row */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search by vehicle reg #, customer, make, model, technician, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ width: '180px' }}>
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="ALL">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>

      </div>

      {/* Services Table */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle & Registration</th>
                <th>Customer</th>
                <th>Service Type & Scope</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Scheduled</th>
                <th>Technician</th>
                <th>Labor + Parts = Total</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No service jobs found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredServices.map((svc) => (
                  <tr key={svc.id}>
                    <td>
                      <strong style={{ color: '#818cf8' }}>#{svc.id}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>
                        {svc.vehicle?.vehicleNumber}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {svc.vehicle?.make} {svc.vehicle?.model} ({svc.vehicle?.year})
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#e5e7eb' }}>
                        {svc.vehicle?.customer?.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {svc.vehicle?.customer?.phone}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#93c5fd' }}>
                        {svc.serviceType?.replace(/_/g, ' ')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {svc.description}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-priority-${svc.priority?.toLowerCase() || 'medium'}`}>
                        {svc.priority}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`badge badge-${svc.status?.toLowerCase() || 'pending'}`}
                        style={{ cursor: 'pointer', border: '1px dashed' }}
                        title="Click to update status"
                        onClick={() => onOpenStatusModal(svc)}
                      >
                        {svc.status} ✎
                      </button>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {svc.scheduledDate}
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {svc.technicianName || '—'}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#34d399' }}>
                        ₹{Number(svc.totalCost || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        L: ₹{Number(svc.laborCost || 0).toFixed(0)} | P: ₹{Number(svc.partsCost || 0).toFixed(0)}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          className="btn btn-secondary btn-sm btn-icon"
                          title="Generate Tax Invoice"
                          onClick={() => onViewInvoice(svc)}
                          style={{ color: '#38bdf8' }}
                        >
                          <FileText size={15} />
                        </button>
                        <button
                          className="btn btn-secondary btn-sm btn-icon"
                          title="Edit Service Record"
                          onClick={() => onEditService(svc)}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm btn-icon"
                          title="Delete Service Record"
                          onClick={() => onDeleteService(svc.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
