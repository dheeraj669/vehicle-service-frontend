const rawBase = import.meta.env.VITE_API_BASE_URL || '/api';
const BASE_URL = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;


/**
 * Standard fetch helper with JSON parsing and error handling
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const result = await res.json();
    if (!res.ok) {
      const errMsg = result.message || `Request failed with status ${res.status}`;
      throw new Error(errMsg);
    }
    return result.data !== undefined ? result.data : result;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, err);
    throw err;
  }
}

// -------------------------------------------------------------
// Dashboard API
// -------------------------------------------------------------
export const getDashboardStats = () => request('/dashboard/stats');

// -------------------------------------------------------------
// Customers API
// -------------------------------------------------------------
export const getCustomers = (search = '') => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return request(`/customers${query}`);
};

export const getCustomerById = (id) => request(`/customers/${id}`);

export const getCustomerByPhone = (phone) => 
  request(`/customers/by-phone?phone=${encodeURIComponent(phone)}`);

export const createCustomer = (customerData) =>
  request('/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
  });

export const updateCustomer = (id, customerData) =>
  request(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(customerData),
  });

export const deleteCustomer = (id) =>
  request(`/customers/${id}`, {
    method: 'DELETE',
  });

// -------------------------------------------------------------
// Vehicles API
// -------------------------------------------------------------
export const getVehicles = (search = '') => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return request(`/vehicles${query}`);
};

export const getVehicleById = (id) => request(`/vehicles/${id}`);

export const getVehicleByNumber = (number) =>
  request(`/vehicles/by-number/${encodeURIComponent(number)}`);

export const getVehiclesByCustomer = (customerId) =>
  request(`/vehicles/by-customer/${customerId}`);

export const createVehicle = (vehicleData) =>
  request('/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicleData),
  });

export const updateVehicle = (id, vehicleData) =>
  request(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(vehicleData),
  });

export const deleteVehicle = (id) =>
  request(`/vehicles/${id}`, {
    method: 'DELETE',
  });

// -------------------------------------------------------------
// Service Records API
// -------------------------------------------------------------
export const getServices = ({ search = '', status = '' } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  const q = params.toString() ? `?${params.toString()}` : '';
  return request(`/services${q}`);
};

export const getServiceById = (id) => request(`/services/${id}`);

export const getServicesByVehicle = (vehicleId) =>
  request(`/services/by-vehicle/${vehicleId}`);

export const getServicesByCustomer = (customerId) =>
  request(`/services/by-customer/${customerId}`);

export const createService = (serviceData) =>
  request('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  });

export const updateService = (id, serviceData) =>
  request(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  });

export const updateServiceStatus = (id, statusData) =>
  request(`/services/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(statusData),
  });

export const deleteService = (id) =>
  request(`/services/${id}`, {
    method: 'DELETE',
  });
