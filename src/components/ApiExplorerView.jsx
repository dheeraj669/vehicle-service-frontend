import React, { useState } from 'react';
import { 
  Terminal, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Database, 
  Layers, 
  Code2 
} from 'lucide-react';

export default function ApiExplorerView() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const apiEndpoints = [
    {
      group: 'Analytics & Dashboard',
      method: 'GET',
      path: '/api/dashboard/stats',
      description: 'Returns real-time vehicle counts, revenue total, status distribution, and recent service orders.',
      sampleResponse: '{\n  "success": true,\n  "message": "Dashboard statistics retrieved",\n  "data": {\n    "totalCustomers": 5,\n    "totalVehicles": 6,\n    "totalServices": 6,\n    "totalRevenue": 10500.00,\n    "pendingServices": 1,\n    "inProgressServices": 1\n  }\n}'
    },
    {
      group: 'Customer Management',
      method: 'GET',
      path: '/api/customers',
      description: 'Fetch all registered customers or query by keyword `?search=Rahul`.',
      sampleResponse: '[\n  {\n    "id": 1,\n    "name": "Rahul Sharma",\n    "email": "rahul.sharma@example.com",\n    "phone": "+91 98765 43210"\n  }\n]'
    },
    {
      group: 'Customer Management',
      method: 'POST',
      path: '/api/customers',
      description: 'Register a new customer profile.',
      samplePayload: '{\n  "name": "Kavita Sundaram",\n  "email": "kavita.s@example.com",\n  "phone": "+91 98450 11223",\n  "address": "Chennai, India"\n}'
    },
    {
      group: 'Vehicle Management',
      method: 'GET',
      path: '/api/vehicles',
      description: 'Retrieve all vehicles or filter with `?search=Creta`.',
      sampleResponse: '[\n  {\n    "id": 1,\n    "vehicleNumber": "TS09EA1234",\n    "make": "Hyundai",\n    "model": "Creta SX(O)",\n    "year": 2022,\n    "fuelType": "PETROL",\n    "mileage": 24500\n  }\n]'
    },
    {
      group: 'Vehicle Management',
      method: 'POST',
      path: '/api/vehicles',
      description: 'Register a vehicle and link to customer ID.',
      samplePayload: '{\n  "customerId": 1,\n  "vehicleNumber": "TS09XY9999",\n  "make": "Kia",\n  "model": "Seltos GTX Plus",\n  "year": 2024,\n  "vehicleType": "SUV",\n  "fuelType": "PETROL",\n  "mileage": 3500\n}'
    },
    {
      group: 'Service Workflows',
      method: 'GET',
      path: '/api/services?status=IN_PROGRESS',
      description: 'Filter service orders by workshop status (`PENDING`, `IN_PROGRESS`, `WAITING_PARTS`, `COMPLETED`, `DELIVERED`).'
    },
    {
      group: 'Service Workflows',
      method: 'POST',
      path: '/api/services',
      description: 'Dispatch a new service job order.',
      samplePayload: '{\n  "vehicleId": 1,\n  "serviceType": "PERIODIC_MAINTENANCE",\n  "description": "30,000 KM Major Service",\n  "status": "PENDING",\n  "priority": "HIGH",\n  "scheduledDate": "2026-10-18",\n  "technicianName": "Ramesh Kumar",\n  "laborCost": 1200.00,\n  "partsCost": 2200.00\n}'
    },
    {
      group: 'Service Workflows',
      method: 'PATCH',
      path: '/api/services/{id}/status',
      description: 'Quickly transition service status, add labor/parts costs, and log technician notes.',
      samplePayload: '{\n  "status": "COMPLETED",\n  "laborCost": 1400.00,\n  "partsCost": 2850.00,\n  "notes": "Quality check passed. Ready for delivery.",\n  "completionDate": "2026-10-12"\n}'
    }
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadPostmanCollection = () => {
    // Read the postman file or trigger download
    window.open('/postman/Vehicle_Service_Management_System.postman_collection.json', '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Terminal size={20} color="#818cf8" />
            <span style={{ fontSize: '0.8125rem', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              REST API & Postman Integration
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
            REST API Endpoints & Postman Collection
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '640px' }}>
            Tested RESTful endpoints built with Spring Boot, Spring Data JPA, and MySQL. Use Postman or curl to test all endpoints.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="http://localhost:8085/h2-console"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <Database size={16} /> Open H2 DB Console <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Postman Collection Callout */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb923c' }}>
            <Layers size={24} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff', fontWeight: 700 }}>
              Official Postman Collection Ready
            </h4>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Location: <code>postman/Vehicle_Service_Management_System.postman_collection.json</code>
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.8125rem', color: '#fed7aa', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '6px' }}>
          Base URL: <strong>http://localhost:8085/api</strong>
        </div>
      </div>

      {/* Endpoints List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0 0' }}>
          Documented REST Endpoints
        </h3>

        {apiEndpoints.map((ep, idx) => {
          const methodColor = 
            ep.method === 'GET' ? '#34d399' :
            ep.method === 'POST' ? '#60a5fa' :
            ep.method === 'PUT' ? '#f59e0b' :
            ep.method === 'PATCH' ? '#c084fc' : '#f87171';

          return (
            <div key={idx} className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    background: `${methodColor}20`,
                    color: methodColor,
                    border: `1px solid ${methodColor}50`,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em'
                  }}>
                    {ep.method}
                  </span>
                  <code style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>
                    {ep.path}
                  </code>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ({ep.group})
                  </span>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyToClipboard(`http://localhost:8080${ep.path}`, idx)}
                >
                  {copiedIndex === idx ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                  {copiedIndex === idx ? 'Copied' : 'Copy URL'}
                </button>
              </div>

              <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {ep.description}
              </p>

              {(ep.samplePayload || ep.sampleResponse) && (
                <div style={{ marginTop: '0.75rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {ep.samplePayload ? 'Request Body Sample (JSON):' : 'Response Sample:'}
                  </span>
                  <pre style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#93c5fd', overflowX: 'auto', fontFamily: 'Consolas, monospace' }}>
                    {ep.samplePayload || ep.sampleResponse}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
