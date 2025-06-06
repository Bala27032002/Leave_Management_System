import React, { useEffect, useState } from 'react';
import { Grid, Modal, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import UpdateEmployeeForm from './UpdateEmployeeForm'; 
import AddNewUser from './AddNewUser';

const EmployeeTable = () => {
  const [tableData, setTableData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/employees');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/auth/employees/${id}`);
      setSelectedEmployee(response.data);
      setOpenEdit(true);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8000/auth/employees/${id}`, updatedData);

      setTableData((prevData) =>
        prevData.map((employee) =>
          employee.id === id ? { ...employee, ...updatedData } : employee
        )
      );
      setOpenEdit(false);
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const url = `http://localhost:8000/auth/employees/${employeeToDelete}`;
      await axios.delete(url);

      setTableData((prevData) => prevData.filter((employee) => employee.id !== employeeToDelete));
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
    } catch (error) {
      console.error('Error deleting employee data:', error);
    }
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setEmployeeToDelete(null);
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <Grid style={{ minHeight: '100vh', marginTop: '3rem' }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>

        <Grid item>

        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={openAddModal}>
            Add Employee
          </Button>
        </Grid>
      </Grid>
      <TableContainer style={{ marginTop: '1%' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ borderBottom: 'solid #2F70CB 2px', background: 'white', height: '3rem' }}>
              {['S.No.', 'Name', 'Email', 'Role', 'Employee Id', 'Permissions', 'Date of Joining', 'ACTIONS'].map((heading) => (
                <TableCell key={heading} align="center" style={{ color: '#1D1929' }}>
                  <Typography className="text-15-500-22-Poppins" style={{ minWidth: '100px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {heading}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index} style={{ height: 'auto' }}>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#0086EE', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#4BA97E', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.Name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#4BA97E', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.email_id}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#C6851A', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.role}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#DC5B51', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.employeeId}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#6D28D9', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.permissions.admin ? 'Admin' : ''}{item.permissions.employee ? 'Employee' : ''}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#9558CA', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {new Date(item.joiningDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(item.id)}> {/* Use correct id */}
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="secondary" onClick={() => handleDeleteClick(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Employee Form Modal */}
      {selectedEmployee && (
        <UpdateEmployeeForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          employeeData={selectedEmployee}
          onUpdate={handleUpdate}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this employee?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Modal
        open={isAddModalOpen}
        onClose={closeAddModal}
        aria-labelledby="add-employee-modal"
        aria-describedby="add-employee-modal-description"
        BackdropProps={{
          onClick: closeAddModal,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto',
            maxHeight: '100vh',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            outline: 'none',
          }}
        >
          <AddNewUser closeModal={closeAddModal} />
        </div>
      </Modal>
    </Grid>
  );
};

export default EmployeeTable;
