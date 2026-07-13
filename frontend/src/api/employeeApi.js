import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://api:8080/api/employees';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const employeeApi = {
  getAll: (params) => client.get('', { params }),
  getById: (id) => client.get(`/${id}`),
  create: (employee) => client.post('', employee),
  update: (id, employee) => client.put(`/${id}`, employee),
  remove: (id) => client.delete(`/${id}`),
};

export default employeeApi;
