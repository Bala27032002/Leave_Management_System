import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Grid, Box } from '@mui/material';

const UpdateEmployeeForm = ({ open, onClose, employeeData, onUpdate }) => {
  const [formData, setFormData] = useState({
    Name: '',
    email_id: '',
    role: '',
    employeeId: '',
    permissions: { admin: false, employee: true },
    joiningDate: '',
  });

  useEffect(() => {
    // Populate the form with the employee data when it becomes available
    if (employeeData) {
      setFormData({
        Name: employeeData.Name || '',
        email_id: employeeData.email_id || '',
        role: employeeData.role || '',
        employeeId: employeeData.employeeId || '',
        permissions: employeeData.permissions || { admin: false, employee: true },
        joiningDate: employeeData.joiningDate ? new Date(employeeData.joiningDate).toISOString().split('T')[0] : '',
      });
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = () => {
    // Update the employee data and close the modal
    onUpdate(employeeData.id, formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Joining Date"
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <label>
              <input
                type="checkbox"
                name="admin"
                checked={formData.permissions.admin}
                onChange={handleCheckboxChange}
              />
              Admin
            </label>
            <label style={{ marginLeft: '20px' }}>
              <input
                type="checkbox"
                name="employee"
                checked={formData.permissions.employee}
                onChange={handleCheckboxChange}
              />
              Employee
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default UpdateEmployeeForm;
