import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ServicesView from './components/ServicesView';
import VehiclesView from './components/VehiclesView';
import CustomersView from './components/CustomersView';
import CustomerPortalView from './components/CustomerPortalView';
import ApiExplorerView from './components/ApiExplorerView';
import ServiceModal from './components/ServiceModal';
import VehicleModal from './components/VehicleModal';
import CustomerModal from './components/CustomerModal';
import StatusModal from './components/StatusModal';
import InvoiceModal from './components/InvoiceModal';

import {
  getDashboardStats,
  getServices,
  getVehicles,
  getCustomers,
  createService,
  updateService,
  updateServiceStatus,
  deleteService,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from './services/api';

import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Core Data
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Modals State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [serviceForStatus, setServiceForStatus] = useState(null);

  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [serviceForInvoice, setServiceForInvoice] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Refresh data from backend
  const loadAllData = useCallback(async () => {
    try {
      const [statsData, servicesData, vehiclesData, customersData] = await Promise.all([
        getDashboardStats().catch(() => null),
        getServices().catch(() => []),
        getVehicles().catch(() => []),
        getCustomers().catch(() => []),
      ]);

      if (statsData) {
        setStats(statsData);
        setIsConnected(true);
      }
      setServices(Array.isArray(servicesData) ? servicesData : []);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
      setCustomers(Array.isArray(customersData) ? customersData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // --------------------------------------------------------------------------
  // Service Handlers
  // --------------------------------------------------------------------------
  const handleOpenNewService = () => {
    setEditingService(null);
    setServiceModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceModalOpen(true);
  };

  const handleSaveService = async (serviceData) => {
    try {
      if (editingService) {
        await updateService(editingService.id, serviceData);
        showToast(`Service order #${editingService.id} updated successfully!`);
      } else {
        await createService(serviceData);
        showToast('New service order created successfully!');
      }
      setServiceModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to save service record', 'error');
    }
  };

  const handleQuickStatusUpdate = async (id, statusPayload) => {
    try {
      await updateServiceStatus(id, statusPayload);
      showToast(`Status updated to ${statusPayload.status}`);
      setStatusModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm(`Are you sure you want to delete service order #${id}?`)) return;
    try {
      await deleteService(id);
      showToast(`Service order #${id} deleted.`);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to delete service', 'error');
    }
  };

  const handleViewInvoice = (service) => {
    setServiceForInvoice(service);
    setInvoiceModalOpen(true);
  };

  const handleOpenStatusModal = (service) => {
    setServiceForStatus(service);
    setStatusModalOpen(true);
  };

  // --------------------------------------------------------------------------
  // Vehicle Handlers
  // --------------------------------------------------------------------------
  const handleOpenNewVehicle = () => {
    setEditingVehicle(null);
    setVehicleModalOpen(true);
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleModalOpen(true);
  };

  const handleSaveVehicle = async (vehicleData) => {
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, vehicleData);
        showToast(`Vehicle ${vehicleData.vehicleNumber} updated successfully!`);
      } else {
        await createVehicle(vehicleData);
        showToast(`Vehicle ${vehicleData.vehicleNumber} registered successfully!`);
      }
      setVehicleModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to save vehicle', 'error');
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle and its service records?')) return;
    try {
      await deleteVehicle(id);
      showToast('Vehicle deleted successfully.');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to delete vehicle', 'error');
    }
  };

  // --------------------------------------------------------------------------
  // Customer Handlers
  // --------------------------------------------------------------------------
  const handleOpenNewCustomer = () => {
    setEditingCustomer(null);
    setCustomerModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setCustomerModalOpen(true);
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, customerData);
        showToast(`Customer ${customerData.name} updated successfully!`);
      } else {
        await createCustomer(customerData);
        showToast(`Customer ${customerData.name} registered successfully!`);
      }
      setCustomerModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to save customer', 'error');
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer profile and their associated vehicles?')) return;
    try {
      await deleteCustomer(id);
      showToast('Customer record deleted.');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to delete customer', 'error');
    }
  };

  return (
    <div className="app-container">
      
      {/* Toast Alert Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(16, 185, 129, 0.95)',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={isConnected}
        onNewService={handleOpenNewService}
      />

      {/* View Content Area */}
      <main className="main-content">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <RefreshCw size={36} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              Connecting to AutoService Hub Backend...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                stats={stats}
                onViewService={handleEditService}
                onNewService={handleOpenNewService}
                onViewInvoice={handleViewInvoice}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'services' && (
              <ServicesView
                services={services}
                onNewService={handleOpenNewService}
                onEditService={handleEditService}
                onDeleteService={handleDeleteService}
                onOpenStatusModal={handleOpenStatusModal}
                onViewInvoice={handleViewInvoice}
              />
            )}

            {activeTab === 'vehicles' && (
              <VehiclesView
                vehicles={vehicles}
                services={services}
                onNewVehicle={handleOpenNewVehicle}
                onEditVehicle={handleEditVehicle}
                onDeleteVehicle={handleDeleteVehicle}
                onNewServiceForVehicle={handleOpenNewService}
                onViewInvoice={handleViewInvoice}
              />
            )}

            {activeTab === 'customers' && (
              <CustomersView
                customers={customers}
                vehicles={vehicles}
                onNewCustomer={handleOpenNewCustomer}
                onEditCustomer={handleEditCustomer}
                onDeleteCustomer={handleDeleteCustomer}
              />
            )}

            {activeTab === 'customer-portal' && (
              <CustomerPortalView
                vehicles={vehicles}
                services={services}
                onViewInvoice={handleViewInvoice}
                onNewService={handleOpenNewService}
              />
            )}

            {activeTab === 'api-explorer' && (
              <ApiExplorerView />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8125rem'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <strong>Vehicle Service Management System</strong> • Java 17, Spring Boot, MySQL & React.js
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Backend: <strong style={{ color: '#a5b4fc' }}>http://localhost:8085</strong></span>
            <span>Frontend: <strong style={{ color: '#38bdf8' }}>http://localhost:5173</strong></span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ServiceModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onSave={handleSaveService}
        service={editingService}
        vehicles={vehicles}
      />

      <VehicleModal
        isOpen={vehicleModalOpen}
        onClose={() => setVehicleModalOpen(false)}
        onSave={handleSaveVehicle}
        vehicle={editingVehicle}
        customers={customers}
      />

      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
      />

      <StatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onUpdateStatus={handleQuickStatusUpdate}
        service={serviceForStatus}
      />

      <InvoiceModal
        service={serviceForInvoice}
        onClose={() => setInvoiceModalOpen(false)}
      />

    </div>
  );
}
