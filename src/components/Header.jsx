import React from 'react';
import { 
  Wrench, 
  LayoutDashboard, 
  ClipboardList, 
  Car, 
  Users, 
  Search, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isConnected, 
  onNewService,
  isCustomerMode,
  setIsCustomerMode 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Service Jobs', icon: ClipboardList },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'customer-portal', label: 'Customer Live Tracker', icon: Search },
    { id: 'api-explorer', label: 'REST APIs & Postman', icon: Terminal },
  ];

  return (
    <header style={{
      background: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Brand & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
          }}>
            <Wrench size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AutoService Hub
              </h1>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.4)', fontWeight: 600 }}>
                PRO
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Vehicle Service Management System • Spring Boot + React + MySQL
            </p>
          </div>
        </div>

        {/* Backend Connectivity Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            background: isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: isConnected ? '#34d399' : '#f87171',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isConnected ? '#10b981' : '#ef4444',
              boxShadow: isConnected ? '0 0 8px #10b981' : '0 0 8px #ef4444',
            }} />
            <span>{isConnected ? 'Backend Live (Port 8085)' : 'Backend Connecting...'}</span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={onNewService}
            style={{ fontWeight: 600 }}
          >
            <Wrench size={15} /> + New Job Order
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        {navItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.75rem 1.1rem',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid #6366f1' : '3px solid transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Icon size={16} color={isActive ? '#818cf8' : 'currentColor'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
