import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Plus, 
  History, 
  Edit3, 
  Trash2, 
  Fuel, 
  Gauge, 
  User, 
  X,
  FileText
} from 'lucide-react';

export default function VehiclesView({ 
  vehicles, 
  services,
  onNewVehicle, 
  onEditVehicle, 
  onDeleteVehicle, 
  onNewServiceForVehicle,
  onViewInvoice 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicleForHistory, setSelectedVehicleForHistory] = useState(null);

  const filteredVehicles = vehicles.filter((v) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      v.vehicleNumber?.toLowerCase().includes(q) ||
      v.make?.toLowerCase().includes(q) ||
      v.model?.toLowerCase().includes(q) ||
      v.customer?.name?.toLowerCase().includes(q) ||
      v.fuelType?.toLowerCase().includes(q) ||
      v.vehicleType?.toLowerCase().includes(q)
    );
  });

  const getVehicleHistory = (vehicleId) => {
    return services.filter(s => s.vehicle?.id === vehicleId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            Vehicle Fleet Registry
          </h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Customer registered automobiles, service logs, mileage records, and technical specs
          </p>
        </div>

        <button className="btn btn-primary" onClick={onNewVehicle}>
          <Plus size={16} /> Register New Vehicle
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by registration plate, make, model, fuel type, or owner name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Vehicles Grid / Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Registration #</th>
                <th>Make & Model</th>
                <th>Year</th>
                <th>Vehicle Type</th>
                <th>Fuel System</th>
                <th>Odometer (KM)</th>
                <th>Owner / Customer</th>
                <th>Jobs Count</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No vehicles found in registry. Click "+ Register New Vehicle" to add one!
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((v) => {
                  const history = getVehicleHistory(v.id);
                  return (
                    <tr key={v.id}>
                      <td>
                        <div style={{
                          display: 'inline-flex',
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(99, 102, 241, 0.15)',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          borderRadius: '6px',
                          fontWeight: 700,
                          color: '#a5b4fc',
                          letterSpacing: '0.05em'
                        }}>
                          {v.vehicleNumber}
                        </div>
                      </td>
                      <td>
                        <strong style={{ color: '#ffffff' }}>{v.make}</strong> {v.model}
                      </td>
                      <td>{v.year}</td>
                      <td>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-secondary)'
                        }}>
                          {v.vehicleType}
                        </span>
                      </td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}>
                          <Fuel size={14} color="#38bdf8" /> {v.fuelType}
                        </span>
                      </td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}>
                          <Gauge size={14} color="#34d399" /> {v.mileage?.toLocaleString() || 0} KM
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#f3f4f6' }}>{v.customer?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.customer?.phone}</div>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px',
                          background: history.length > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: history.length > 0 ? '#34d399' : 'var(--text-muted)',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {history.length} {history.length === 1 ? 'service' : 'services'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            title="View Maintenance History Timeline"
                            onClick={() => setSelectedVehicleForHistory(v)}
                            style={{ color: '#818cf8' }}
                          >
                            <History size={14} /> History
                          </button>
                          <button
                            className="btn btn-secondary btn-sm btn-icon"
                            title="Edit Vehicle"
                            onClick={() => onEditVehicle(v)}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm btn-icon"
                            title="Delete Vehicle"
                            onClick={() => onDeleteVehicle(v.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Maintenance History Modal */}
      {selectedVehicleForHistory && (
        <div className="modal-overlay" onClick={() => setSelectedVehicleForHistory(null)}>
          <div className="modal-content" style={{ maxWidth: '680px', padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '8px', color: '#818cf8' }}>
                  <History size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                    Maintenance History: {selectedVehicleForHistory.vehicleNumber}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    {selectedVehicleForHistory.make} {selectedVehicleForHistory.model} ({selectedVehicleForHistory.year}) • Owner: {selectedVehicleForHistory.customer?.name}
                  </p>
                </div>
              </div>
              <button className="btn btn-secondary btn-icon" onClick={() => setSelectedVehicleForHistory(null)}>
                <X size={18} />
              </button>
            </div>

            {/* History timeline list */}
            {(() => {
              const hist = getVehicleHistory(selectedVehicleForHistory.id);
              if (hist.length === 0) {
                return (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No past service history recorded for this vehicle.
                  </div>
                );
              }
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto' }}>
                  {hist.map((svc) => (
                    <div 
                      key={svc.id} 
                      style={{ 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '10px', 
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: 700, color: '#ffffff' }}>#{svc.id} - {svc.serviceType?.replace(/_/g, ' ')}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                            ({svc.scheduledDate})
                          </span>
                        </div>
                        <span className={`badge badge-${svc.status?.toLowerCase() || 'pending'}`}>
                          {svc.status}
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {svc.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>Technician: {svc.technicianName || 'Workshop Staff'}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <strong style={{ color: '#34d399', fontSize: '0.875rem' }}>
                            ₹{Number(svc.totalCost || 0).toFixed(2)}
                          </strong>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setSelectedVehicleForHistory(null);
                              onViewInvoice(svc);
                            }}
                          >
                            <FileText size={12} /> Tax Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedVehicleForHistory(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
