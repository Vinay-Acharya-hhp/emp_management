import React, { useEffect, useState } from 'react';

const emptyForm = { firstName: '', lastName: '', email: '', department: '', salary: '' };

export default function EmployeeForm({ editingEmployee, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName,
        email: editingEmployee.email,
        department: editingEmployee.department,
        salary: editingEmployee.salary,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.department.trim()) newErrors.department = 'Department is required';
    if (!form.salary || Number(form.salary) <= 0) newErrors.salary = 'Salary must be a positive number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ ...form, salary: Number(form.salary) });
    if (!editingEmployee) setForm(emptyForm);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>

      <div className="form-row">
        <label>First Name</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-row">
        <label>Last Name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-row">
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-row">
        <label>Department</label>
        <input name="department" value={form.department} onChange={handleChange} />
        {errors.department && <span className="error">{errors.department}</span>}
      </div>

      <div className="form-row">
        <label>Salary</label>
        <input name="salary" type="number" value={form.salary} onChange={handleChange} />
        {errors.salary && <span className="error">{errors.salary}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingEmployee ? 'Update' : 'Add'}
        </button>
        {editingEmployee && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
