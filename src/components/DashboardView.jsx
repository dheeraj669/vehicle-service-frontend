import React from 'react';
import { 
  Users, 
  Car, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  ArrowUpRight, 
  Wrench, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function DashboardView({ 
  stats, 
  onViewService, 
  onNewService, 
  onViewInvoice, 
  setActiveTab 
}) {
  const recentList = stats?.recentServices || [];
  const breakdown = stats?.statusBreakdown || {};

  const metricCards = [
    {
      title: 'Total Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: '#6366f1',
      bgGlow: 'rgba(99, 102, 241, 0.15)',
      tab: 'customers',
    },
    {
      title: 'Registered Vehicles',
      value: stats?.totalVehicles || 0,
      icon: Car,
      color: '#06b6d4',
      bgGlow: 'rgba(6, 182, 212, 0.15)',
      tab: 'vehicles',
    },
    {
      title: 'Active Work Orders',
      value: (stats?.pendingServices || 0) + (stats?.inProgressServices || 0) + (stats?.waitingPartsServices || 0),
      subtitle: `${stats?.inProgressServices || 0} currently in bay`,
      icon: Clock,
      color: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      tab: 'services',
    },
    {
      title: 'Completed & Delivered',
      value: (stats?.completedServices || 0) + (stats?.deliveredServices || 0),
      icon: CheckCircle,
      color: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      tab: 'services',
    },
    {
      title: 'Workshop Revenue',
      value: `₹${Number(stats?.totalRevenue || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      subtitle: 'Completed services billing',
      icon: DollarSign,
      color: '#a855f7',
      bgGlow: 'rgba(168, 85, 247, 0.15)',
      tab: 'services',
    },
  ];

  const pipelineStages = [
    { key: 'PENDING', label: '1. Pending Intake', count: stats?.pendingServices || 0, color: '#f59e0b' },
    { key: 'IN_PROGRESS', label: '2. In Progress', count: stats?.inProgressServices || 0, color: '#3b82f6' },
    { key: 'WAITING_PARTS', label: '3. Waiting Parts', count: stats?.waitingPartsServices || 0, color: '#8b5cf6' },
    { key: 'COMPLETED', label: '4. Service Completed', count: stats?.completedServices || 0, color: '#10b981' },
    { key: 'DELIVERED', label: '5. Delivered to Owner', count: stats?.deliveredServices || 0, color: '#06b6d4' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        borderLeft: '4px solid #6366f1'
      }}>
        <div>
          <span style={{ fontSize: '0.8125rem', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Workshop Operations Center
          </span>
          <h2 style={{ fontSize: '1.75rem', margin: '0.25rem 0 0.5rem', fontWeight: 800 }}>
            Vehicle Service Management Dashboard
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '650px' }}>
            Manage client vehicles, dispatch maintenance tasks to technicians, track parts orders, and generate detailed itemized invoices with zero hassle.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('customer-portal')}>
            <Users size={16} /> Customer Live Tracker
          </button>
          <button className="btn btn-primary" onClick={onNewService}>
            <Wrench size={16} /> + Create New Job Order
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
      }}>
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => setActiveTab(card.tab)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {card.title}
                  </p>
                  <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                    {card.value}
                  </h3>
                  {card.subtitle && (
                    <p style={{ margin: 0, fontSize: '0.75rem', color: card.color }}>
                      {card.subtitle}
                    </p>
                  )}
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: card.bgGlow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color,
                }}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Pipeline Overview */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 700 }}>
              Workshop Service Pipeline Status
            </h3>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Real-time distribution of vehicles across intake, repair bays, and delivery
            </p>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('services')}
          >
            View All Services <ChevronRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {pipelineStages.map((stage) => (
            <div
              key={stage.key}
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid var(--border-color)',
                borderTop: `3px solid ${stage.color}`,
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {stage.label}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: stage.color, margin: '0.35rem 0' }}>
                {stage.count}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Active vehicles
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 700 }}>
              Recent Service Job Orders
            </h3>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Latest service requests and updates from the service center floor
            </p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('services')}>
            Manage All Jobs
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job #</th>
                <th>Vehicle & Customer</th>
                <th>Service Scope</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Lead Tech</th>
                <th>Total Cost</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentList.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No service orders registered yet. Click "+ Create New Job Order" to get started!
                  </td>
                </tr>
              ) : (
                recentList.map((svc) => (
                  <tr key={svc.id}>
                    <td>
                      <strong style={{ color: '#818cf8' }}>#{svc.id}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>
                        {svc.vehicle?.vehicleNumber}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {svc.vehicle?.make} {svc.vehicle?.model} • {svc.vehicle?.customer?.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>
                        {svc.serviceType?.replace(/_/g, ' ')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {svc.description}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${svc.status?.toLowerCase() || 'pending'}`}>
                        {svc.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-priority-${svc.priority?.toLowerCase() || 'medium'}`}>
                        {svc.priority}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                        {svc.technicianName || 'Unassigned'}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#34d399' }}>
                        ₹{Number(svc.totalCost || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </strong>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          title="Generate Tax Invoice"
                          onClick={() => onViewInvoice(svc)}
                        >
                          <FileText size={14} /> Invoice
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onViewService(svc)}
                        >
                          Update
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
