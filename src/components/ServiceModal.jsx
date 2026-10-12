import React, { useState, useEffect } from 'react';
import { X, Wrench, AlertCircle } from 'lucide-react';

export default function ServiceModal({ isOpen, onClose, onSave, service, vehicles = [] }) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceType: 'PERIODIC_MAINTENANCE',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    scheduledDate: new Date().toISOString().split('T')[0],
    completionDate: '',
    technicianName: 'Ramesh Kumar',
    laborCost: '800.00',
    partsCost: '1200.00',
    notes: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (service) {
      setFormData({
        vehicleId: service.vehicle?.id || '',
        serviceType: service.serviceType || 'PERIODIC_MAINTENANCE',
        description: service.description || '',
        status: service.status || 'PENDING',
        priority: service.priority || 'MEDIUM',
        scheduledDate: service.scheduledDate || new Date().toISOString().split('T')[0],
        completionDate: service.completionDate || '',
        technicianName: service.technicianName || '',
        laborCost: service.laborCost !== undefined ? String(service.laborCost) : '0',
        partsCost: service.partsCost !== undefined ? String(service.partsCost) : '0',
        notes: service.notes || '',
      });
    } else {
      setFormData({
        vehicleId: vehicles.length > 0 ? vehicles[0].id : '',
        serviceType: 'PERIODIC_MAINTENANCE',
        description: '',
        status: 'PENDING',
        priority: 'MEDIUM',
        scheduledDate: new Date().toISOString().split('T')[0],
        completionDate: '',
        technicianName: 'Ramesh Kumar',
        laborCost: '800.00',
        partsCost: '1200.00',
        notes: '',
      });
    }
    setError('');
  }, [service, vehicles, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vehicleId) {
      setError('Please select a vehicle');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please enter service description / issues reported');
      return;
    }

    const payload = {
      ...formData,
      vehicleId: Number(formData.vehicleId),
      laborCost: parseFloat(formData.laborCost) || 0,
      partsCost: parseFloat(formData.partsCost) || 0,
      completionDate: formData.completionDate ? formData.completionDate : null,
    };

    onSave(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '8px', color: '#818cf8' }}>
              <Wrench size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {service ? 'Edit Service Record' : 'Create New Service Order'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {service ? `Job ID #${service.id}` : 'Dispatch technician and record work item'}
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.875rem' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Vehicle Registration & Customer *</label>
              <select
                className="form-select"
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                required
              >
                <option value="">-- Select Registered Vehicle --</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.vehicleNumber} — {v.make} {v.model} ({v.customer?.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Service Type *</label>
              <select
                className="form-select"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                required
              >
                <option value="PERIODIC_MAINTENANCE">Periodic Maintenance</option>
                <option value="GENERAL_INSPECTION">General Inspection</option>
                <option value="OIL_CHANGE">Oil & Fluid Change</option>
                <option value="BRAKE_OVERHAUL">Brake Overhaul</option>
                <option value="REPAIR">Repair & Troubleshooting</option>
                <option value="ELECTRICAL_DIAGNOSTICS">Electrical Diagnostics</option>
                <option value="ACCIDENT_REPAIR">Accident / Body Repair</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority Level *</label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent / Express</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Issues Reported / Work Description *</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="e.g. 20,000 KM checkup, oil filter replacement, vibration in brake pedal..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="PENDING">Pending (Received)</option>
                <option value="IN_PROGRESS">In Progress (Under Bay)</option>
                <option value="WAITING_PARTS">Waiting on Parts</option>
                <option value="COMPLETED">Completed (Tested)</option>
                <option value="DELIVERED">Delivered to Owner</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Technician</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Kumar"
                value={formData.technicianName}
                onChange={(e) => setFormData({ ...formData, technicianName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Scheduled Date *</label>
              <input
                type="date"
                className="form-input"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Completion Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Labor Cost (₹)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.laborCost}
                onChange={(e) => setFormData({ ...formData, laborCost: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Parts Cost (₹)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.partsCost}
                onChange={(e) => setFormData({ ...formData, partsCost: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Workshop Notes</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="Diagnostic findings, part serials, road-test remarks..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {service ? 'Save Changes' : 'Create Service Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
