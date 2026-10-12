import React from 'react';
import { Printer, X, Wrench, Calendar, User, Car, CheckCircle, ShieldCheck } from 'lucide-react';

export default function InvoiceModal({ service, onClose }) {
  if (!service) return null;

  const vehicle = service.vehicle || {};
  const customer = vehicle.customer || {};
  const invoiceNo = `INV-2026-${String(service.id).padStart(5, '0')}`;
  const labor = Number(service.laborCost || 0);
  const parts = Number(service.partsCost || 0);
  const subtotal = labor + parts;
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content invoice-printable" 
        style={{ maxWidth: '780px', padding: '2rem', background: '#ffffff', color: '#111827' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header - No print toolbar */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>Invoice Preview</span>
            <span className={`badge badge-${service.status?.toLowerCase() || 'pending'}`} style={{ color: '#111827' }}>
              {service.status}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint} style={{ background: '#2563eb' }}>
              <Printer size={15} /> Print / Save PDF
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ color: '#374151', borderColor: '#d1d5db' }}>
              <X size={15} /> Close
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', padding: '2rem', background: '#ffffff' }}>
          
          {/* Header Brand */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #2563eb', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '38px', height: '38px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                  <Wrench size={22} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>AutoService Hub</h2>
              </div>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#6b7280' }}>
                Premier Multi-Brand Automotive Service & Diagnostics
              </p>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#6b7280' }}>
                GSTIN: 36AAACH7890C1Z4 • Contact: +91 (040) 2345-6789
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1f2937', fontWeight: 700 }}>TAX INVOICE</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', fontWeight: 600, color: '#2563eb' }}>{invoiceNo}</p>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#6b7280' }}>
                Date: {service.completionDate || service.scheduledDate || 'Today'}
              </p>
            </div>
          </div>

          {/* Customer & Vehicle Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <div>
              <h4 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} /> Bill To (Customer)
              </h4>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{customer.name || 'N/A'}</p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.875rem', color: '#475569' }}>Phone: {customer.phone || 'N/A'}</p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.875rem', color: '#475569' }}>Email: {customer.email || 'N/A'}</p>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>{customer.address || ''}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Car size={14} /> Vehicle Specs
              </h4>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.875rem', color: '#475569' }}>
                Reg Plate: <strong style={{ color: '#2563eb' }}>{vehicle.vehicleNumber}</strong>
              </p>
              <p style={{ margin: '0.2rem 0', fontSize: '0.875rem', color: '#475569' }}>
                Fuel / Type: {vehicle.fuelType} • {vehicle.vehicleType}
              </p>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>
                Odometer: {vehicle.mileage?.toLocaleString() || 0} KM
              </p>
            </div>
          </div>

          {/* Job Overview */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.35rem' }}>
              Service Type: <span style={{ color: '#2563eb' }}>{service.serviceType?.replace(/_/g, ' ')}</span>
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', background: '#f1f5f9', padding: '0.75rem', borderRadius: '6px' }}>
              <strong>Work Scope:</strong> {service.description}
            </p>
            {service.notes && (
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                <strong>Technician Notes:</strong> {service.notes}
              </p>
            )}
          </div>

          {/* Itemized Charges Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 600, textAlign: 'right' }}>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem 1rem', color: '#1e293b' }}>
                  Professional Technical Labor & Diagnostic Inspection
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Lead Tech: {service.technicianName || 'Workshop Staff'}</div>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>Labor Charges</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, color: '#1e293b' }}>
                  ₹{labor.toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem 1rem', color: '#1e293b' }}>
                  OEM Spare Parts, Consumables & Fluids
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>OEM Certified replacement parts & high-grade lubricants</div>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>Parts & Consumables</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, color: '#1e293b' }}>
                  ₹{parts.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Totals Section */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
            <div style={{ width: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.875rem', color: '#475569' }}>
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.875rem', color: '#475569' }}>
                <span>GST (18%):</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderTop: '2px solid #e2e8f0', marginTop: '0.35rem', fontSize: '1.125rem', fontWeight: 800, color: '#1e3a8a' }}>
                <span>Total Amount:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Sign-off */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontWeight: 600 }}>
                <ShieldCheck size={16} /> 6-Month / 5,000 KM Workshop Warranty Included
              </div>
              <p style={{ margin: '0.25rem 0 0' }}>Thank you for choosing AutoService Hub for your automotive care!</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #94a3b8', width: '160px', height: '35px' }}></div>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#64748b' }}>Authorized Signatory</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
