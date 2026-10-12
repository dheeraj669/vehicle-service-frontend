import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Car, 
  Edit3, 
  Trash2,
  Calendar
} from 'lucide-react';

export default function CustomersView({ 
  customers, 
  vehicles,
  onNewCustomer, 
  onEditCustomer, 
  onDeleteCustomer,
  onNewVehicleForCustomer 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const getCustomerVehicles = (customerId) => {
    return vehicles.filter(v => v.customer?.id === customerId);
  };

  const filteredCustomers = customers.filter((c) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q) ||
      c.address?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            Customer Directory & Profiles
          </h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Client records, contact communication info, linked vehicles, and service histories
          </p>
        </div>

        <button className="btn btn-primary" onClick={onNewCustomer}>
          <Plus size={16} /> Register New Customer
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
            placeholder="Search by customer name, email address, phone number, or locality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Contact Details</th>
                <th>Address</th>
                <th>Registered Vehicles</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No customers found. Click "+ Register New Customer" to add one!
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const ownedVehicles = getCustomerVehicles(c.id);
                  return (
                    <tr key={c.id}>
                      <td>
                        <strong style={{ color: '#818cf8' }}>#{c.id}</strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                          {c.name}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem', color: '#e5e7eb' }}>
                            <Phone size={13} color="#34d399" /> {c.phone}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <Mail size={13} color="#60a5fa" /> {c.email}
                          </span>
                        </div>
                      </td>
                      <td style={{ maxWidth: '220px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.3rem' }}>
                          <MapPin size={14} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{c.address || 'Not specified'}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {ownedVehicles.length === 0 ? (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No vehicles linked</span>
                          ) : (
                            ownedVehicles.map((v) => (
                              <span
                                key={v.id}
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                  background: 'rgba(99, 102, 241, 0.15)',
                                  color: '#a5b4fc',
                                  border: '1px solid rgba(99, 102, 241, 0.3)',
                                  fontWeight: 600,
                                }}
                              >
                                {v.vehicleNumber} ({v.make})
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <button
                            className="btn btn-secondary btn-sm btn-icon"
                            title="Edit Customer"
                            onClick={() => onEditCustomer(c)}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm btn-icon"
                            title="Delete Customer"
                            onClick={() => onDeleteCustomer(c.id)}
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

    </div>
  );
}
