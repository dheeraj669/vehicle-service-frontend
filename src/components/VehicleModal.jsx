import React, { useState, useEffect } from 'react';
import { X, Car, AlertCircle } from 'lucide-react';

export default function VehicleModal({ isOpen, onClose, onSave, vehicle, customers = [] }) {
  const [formData, setFormData] = useState({
    customerId: '',
    vehicleNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vehicleType: 'CAR',
    fuelType: 'PETROL',
    mileage: '0',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData({
        customerId: vehicle.customer?.id || '',
        vehicleNumber: vehicle.vehicleNumber || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        year: vehicle.year || new Date().getFullYear(),
        vehicleType: vehicle.vehicleType || 'CAR',
        fuelType: vehicle.fuelType || 'PETROL',
        mileage: vehicle.mileage !== undefined ? String(vehicle.mileage) : '0',
      });
    } else {
      setFormData({
        customerId: customers.length > 0 ? customers[0].id : '',
        vehicleNumber: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        vehicleType: 'CAR',
        fuelType: 'PETROL',
        mileage: '0',
      });
    }
    setError('');
  }, [vehicle, customers, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerId) {
      setError('Please select an owner/customer');
      return;
    }
    if (!formData.vehicleNumber.trim()) {
      setError('Please enter a vehicle registration plate number');
      return;
    }
    if (!formData.make.trim() || !formData.model.trim()) {
      setError('Please provide make and model');
      return;
    }

    const payload = {
      ...formData,
      customerId: Number(formData.customerId),
      year: parseInt(formData.year, 10),
      mileage: parseInt(formData.mileage, 10) || 0,
      vehicleNumber: formData.vehicleNumber.trim().toUpperCase(),
    };

    onSave(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(6, 182, 212, 0.2)', borderRadius: '8px', color: '#22d3ee' }}>
              <Car size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {vehicle ? 'Edit Vehicle Details' : 'Register New Vehicle'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {vehicle ? `VIN / Plate: ${vehicle.vehicleNumber}` : 'Add vehicle to workshop registry'}
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
              <label className="form-label">Vehicle Owner (Customer) *</label>
              <select
                className="form-select"
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                required
              >
                <option value="">-- Select Registered Customer --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.phone} ({c.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Registration Plate Number *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. TS09EA1234, DL03CP9876"
                style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Manufacture Year *</label>
              <input
                type="number"
                min="1980"
                max="2030"
                className="form-input"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Make / Manufacturer *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Hyundai, Honda, Tata, Toyota"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Model & Variant *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Creta SX(O), City ZX, Nexon EV"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vehicle Type *</label>
              <select
                className="form-select"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                required
              >
                <option value="CAR">Car</option>
                <option value="SUV">SUV</option>
                <option value="SEDAN">Sedan</option>
                <option value="HATCHBACK">Hatchback</option>
                <option value="MOTORCYCLE">Motorcycle / Two Wheeler</option>
                <option value="MUV">MUV / Van</option>
                <option value="TRUCK">Commercial Truck</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Fuel Type *</label>
              <select
                className="form-select"
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                required
              >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric (EV)</option>
                <option value="HYBRID">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Current Odometer Reading (KM)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="e.g. 25000"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {vehicle ? 'Save Vehicle' : 'Register Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
