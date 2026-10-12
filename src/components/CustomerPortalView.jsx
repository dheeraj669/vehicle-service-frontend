import React, { useState } from 'react';
import { 
  Search, 
  Car, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Wrench, 
  ShieldCheck, 
  User, 
  Phone,
  Calendar,
  Fuel,
  ArrowRight
} from 'lucide-react';

export default function CustomerPortalView({ 
  vehicles = [], 
  services = [], 
  onViewInvoice,
  onNewService 
}) {
  const [searchQuery, setSearchQuery] = useState('TS09EA1234');
  const [matchedVehicle, setMatchedVehicle] = useState(null);
  const [vehicleServices, setVehicleServices] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.trim().toLowerCase();
    
    // Find matching vehicle by registration number or customer phone
    const foundVehicle = vehicles.find((v) => 
      v.vehicleNumber?.toLowerCase().includes(q) ||
      v.customer?.phone?.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
    );

    if (foundVehicle) {
      setMatchedVehicle(foundVehicle);
      const list = services.filter((s) => s.vehicle?.id === foundVehicle.id);
      setVehicleServices(list);
    } else {
      setMatchedVehicle(null);
      setVehicleServices([]);
    }
    setHasSearched(true);
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'PENDING': return 1;
      case 'IN_PROGRESS': return 2;
      case 'WAITING_PARTS': return 3;
      case 'COMPLETED': return 4;
      case 'DELIVERED': return 5;
      default: return 0;
    }
  };

  const activeJob = vehicleServices.find(s => s.status !== 'DELIVERED' && s.status !== 'CANCELLED') || vehicleServices[0];
  const stepIndex = activeJob ? getStepIndex(activeJob.status) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Tracking Box */}
      <div className="glass-panel" style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{
          display: 'inline-flex',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#818cf8',
          fontSize: '0.8125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          gap: '0.4rem',
          alignItems: 'center'
        }}>
          <ShieldCheck size={16} /> Live Customer Self-Service Portal
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Track Your Vehicle Service In Real-Time
        </h2>
        <p style={{ margin: '0 auto 2rem', color: 'var(--text-secondary)', maxWidth: '560px', fontSize: '0.95rem' }}>
          Enter your vehicle registration number or registered mobile number to view live workshop bay status, diagnostics report, and itemized bill.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} style={{ maxWidth: '580px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{
                paddingLeft: '2.75rem',
                height: '50px',
                fontSize: '1rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.04em'
              }}
              placeholder="e.g. TS09EA1234 or +91 98765 43210"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem', height: '50px', fontSize: '0.95rem' }}>
            Track Now
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demo Plates to test:</span>
          {['TS09EA1234', 'KA01MJ4321', 'TS07KH1122'].map((plate) => (
            <button
              key={plate}
              type="button"
              onClick={() => {
                setSearchQuery(plate);
              }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#93c5fd',
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {plate}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && !matchedVehicle && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <AlertCircle size={40} color="#f87171" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem' }}>No Vehicle Found</h3>
          <p style={{ margin: '0 auto 1.5rem', color: 'var(--text-secondary)', maxWidth: '450px', fontSize: '0.875rem' }}>
            We could not find a vehicle matching <strong>"{searchQuery}"</strong>. Please check your plate number or register your vehicle.
          </p>
        </div>
      )}

      {matchedVehicle && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Vehicle & Owner Profile Header */}
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
                <Car size={30} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Registered Vehicle
                </span>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {matchedVehicle.make} {matchedVehicle.model} ({matchedVehicle.year})
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span>Plate: <strong style={{ color: '#60a5fa' }}>{matchedVehicle.vehicleNumber}</strong></span>
                  <span>• Fuel: {matchedVehicle.fuelType}</span>
                  <span>• Odo: {matchedVehicle.mileage?.toLocaleString() || 0} KM</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                <User size={30} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Registered Customer
                </span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                  {matchedVehicle.customer?.name}
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span>{matchedVehicle.customer?.phone}</span>
                  <span>• {matchedVehicle.customer?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Job Progress Tracker */}
          {activeJob ? (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#818cf8', fontWeight: 600 }}>CURRENT SERVICE ORDER #{activeJob.id}</span>
                    <span className={`badge badge-${activeJob.status?.toLowerCase() || 'pending'}`}>
                      {activeJob.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.25rem 0' }}>
                    {activeJob.serviceType?.replace(/_/g, ' ')}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {activeJob.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="btn btn-primary" onClick={() => onViewInvoice(activeJob)}>
                    <FileText size={16} /> View Tax Invoice
                  </button>
                </div>
              </div>

              {/* Progress Steps Visualizer */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.5rem',
                position: 'relative',
                margin: '1.5rem 0'
              }}>
                {[
                  { step: 1, title: 'Intake Booked', desc: 'Job order created' },
                  { step: 2, title: 'In Service Bay', desc: 'Technician inspecting' },
                  { step: 3, title: 'Parts Assembly', desc: 'Spare parts fitted' },
                  { step: 4, title: 'Testing Complete', desc: 'Quality checked' },
                  { step: 5, title: 'Delivered', desc: 'Vehicle collected' },
                ].map((s) => {
                  const isDone = stepIndex >= s.step;
                  const isCurrent = stepIndex === s.step;
                  return (
                    <div
                      key={s.step}
                      style={{
                        background: isCurrent ? 'rgba(99, 102, 241, 0.2)' : isDone ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                        border: isCurrent ? '1px solid #6366f1' : isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                        borderRadius: '10px',
                        padding: '1rem',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isCurrent ? '#6366f1' : isDone ? '#10b981' : 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.5rem',
                        fontWeight: 700,
                        fontSize: '0.875rem'
                      }}>
                        {isDone ? '✓' : s.step}
                      </div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: isCurrent ? '#a5b4fc' : isDone ? '#34d399' : 'var(--text-secondary)' }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {s.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Technician Notes & Cost Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', background: 'rgba(17, 24, 39, 0.6)', padding: '1.25rem', borderRadius: '10px', marginTop: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Assigned Lead Technician
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginTop: '0.2rem' }}>
                    {activeJob.technicianName || 'Workshop Chief Specialist'}
                  </div>
                  {activeJob.notes && (
                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <strong>Latest Update:</strong> {activeJob.notes}
                    </p>
                  )}
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Scheduled / Completion Date
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginTop: '0.2rem' }}>
                    {activeJob.completionDate || activeJob.scheduledDate}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Total Estimated Invoice
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', marginTop: '0.1rem' }}>
                    ₹{Number(activeJob.totalCost || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    (Includes Labor + Spare Parts)
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ margin: '0 0 0.5rem' }}>No Active Servicing in Workshop</h3>
              <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                This vehicle is currently not booked for active repair or maintenance.
              </p>
              <button className="btn btn-primary" onClick={onNewService}>
                Book Service Appointment
              </button>
            </div>
          )}

          {/* Past Service History for this Vehicle */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', margin: '0 0 1rem', fontWeight: 700 }}>
              Service Log History ({vehicleServices.length} Total Jobs)
            </h3>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Job #</th>
                    <th>Date</th>
                    <th>Service Type</th>
                    <th>Status</th>
                    <th>Technician</th>
                    <th>Bill Amount</th>
                    <th style={{ textAlign: 'right' }}>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleServices.map((svc) => (
                    <tr key={svc.id}>
                      <td>#{svc.id}</td>
                      <td>{svc.scheduledDate}</td>
                      <td>{svc.serviceType?.replace(/_/g, ' ')}</td>
                      <td>
                        <span className={`badge badge-${svc.status?.toLowerCase() || 'pending'}`}>
                          {svc.status}
                        </span>
                      </td>
                      <td>{svc.technicianName || '—'}</td>
                      <td>
                        <strong style={{ color: '#34d399' }}>
                          ₹{Number(svc.totalCost || 0).toFixed(2)}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => onViewInvoice(svc)}>
                          <FileText size={13} /> View Bill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
