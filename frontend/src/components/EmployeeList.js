import React from 'react';

export default function EmployeeList({ employees, onEdit, onDelete, loading }) {
  if (loading) return <p className="status-text">Loading employees...</p>;
  if (!employees.length) return <p className="status-text">No employees found.</p>;

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.firstName} {emp.lastName}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>${Number(emp.salary).toLocaleString()}</td>
            <td>
              <button className="btn btn-small" onClick={() => onEdit(emp)}>Edit</button>
              <button className="btn btn-small btn-danger" onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
