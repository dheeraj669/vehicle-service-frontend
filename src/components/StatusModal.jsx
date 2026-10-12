import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StatusModal({ isOpen, onClose, onUpdateStatus, service }) {
  const [status, setStatus] = useState('IN_PROGRESS');
  const [notes, setNotes] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [partsCost, setPartsCost] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  useEffect(() => {
    if (service) {
      setStatus(service.status || 'IN_PROGRESS');
      setNotes('');
      setLaborCost(service.laborCost !== undefined ? String(service.laborCost) : '');
      setPartsCost(service.partsCost !== undefined ? String(service.partsCost) : '');
      setCompletionDate(service.completionDate || new Date().toISOString().split('T')[0]);
    }
  }, [service, isOpen]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      status,
      notes: notes.trim(),
      laborCost: laborCost !== '' ? parseFloat(laborCost) : undefined,
      partsCost: partsCost !== '' ? parseFloat(partsCost) : undefined,
      completionDate: (status === 'COMPLETED' || status === 'DELIVERED') ? completionDate : null,
    };
    onUpdateStatus(service.id, payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px', padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', color: '#34d399' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Update Job Status</h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {service.vehicle?.vehicleNumber} • Job #{service.id}
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">New Service Status *</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="PENDING">PENDING — Waiting to be assigned</option>
              <option value="IN_PROGRESS">IN_PROGRESS — Currently being serviced</option>
              <option value="WAITING_PARTS">WAITING_PARTS — Waiting for spare parts</option>
              <option value="COMPLETED">COMPLETED — Work finished & tested</option>
              <option value="DELIVERED">DELIVERED — Vehicle collected by owner</option>
              <option value="CANCELLED">CANCELLED — Booking revoked</option>
            </select>
          </div>

          {(status === 'COMPLETED' || status === 'DELIVERED') && (
            <div className="form-group">
              <label className="form-label">Completion Date</label>
              <input
                type="date"
                className="form-input"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Labor Cost (₹)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
                placeholder="₹ Labor"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Parts Cost (₹)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={partsCost}
                onChange={(e) => setPartsCost(e.target.value)}
                placeholder="₹ Parts"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status Update Log / Notes</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="e.g. Engine flush completed, brake calipers aligned..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Status Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
