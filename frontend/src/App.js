import React, { useEffect, useState, useCallback } from 'react';
import employeeApi from './api/employeeApi';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [search, setSearch] = useState('');

  const fetchEmployees = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const params = searchTerm ? { search: searchTerm } : {};
      const res = await employeeApi.getAll(params);
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to load employees. Is the backend running on port 8080?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleCreateOrUpdate = async (employeeData) => {
    setError('');
    try {
      if (editingEmployee) {
        await employeeApi.update(editingEmployee.id, employeeData);
      } else {
        await employeeApi.create(employeeData);
      }
      setEditingEmployee(null);
      fetchEmployees(search);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while saving.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await employeeApi.remove(id);
      fetchEmployees(search);
    } catch (err) {
      setError('Failed to delete employee.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Employee Management</h1>
        <p className="subtitle">Java Spring Boot &bull; React &bull; MySQL (3-tier)</p>
      </header>

      {error && <div className="alert">{error}</div>}

      <div className="main-grid">
        <div className="form-panel">
          <EmployeeForm
            editingEmployee={editingEmployee}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setEditingEmployee(null)}
          />
        </div>

        <div className="list-panel">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              placeholder="Search by first or last name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary">Search</button>
            <button
              type="button"
              className="btn"
              onClick={() => { setSearch(''); fetchEmployees(''); }}
            >
              Reset
            </button>
          </form>

          <EmployeeList
            employees={employees}
            loading={loading}
            onEdit={setEditingEmployee}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
