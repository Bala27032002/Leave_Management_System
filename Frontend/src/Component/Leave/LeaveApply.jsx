// MyPermission.js
import React, { useState,useEffect  } from 'react';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ApplyLeaveForm from './ApplyLeaveForm';
import LeaveDetailsModal from './LeaveDetailsModal';

import axios from 'axios';
const LeaveApply = () => {
  const [open, setOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [leaveCategory, setLeaveCategory] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveList, setLeaveList] = useState([]);


  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setLeaveType('');
    setLeaveCategory('');
    setLeaveDate('');
    setReason('');
  };

  const formatDateToDDMMYYYY = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const handleSubmit = async (e) => {
  e.preventDefault(); 

  const employeeId = localStorage.getItem("empid");
  const name = localStorage.getItem("Name");

  const leaveData = {
    employeeId,
    name,
    leaveType,
    leaveCategory,
    leaveDate: formatDateToDDMMYYYY(leaveDate),
    endDate: leaveType === "More than one day" ? formatDateToDDMMYYYY(endDate) : null,
    reason,
    approved_status : "Pending"
  };

  try {
    const response = await axios.post("http://localhost:8000/leave/apply", leaveData);
    fetchLeaves();
    console.log("Leave Applied Successfully:", response.data);

    // Optional: Close the dialog or show success message
      handleClose();

  } catch (error) {
    console.error("Error submitting leave application:", error);
  }
};
const fetchLeaves = async () => {
  try {
    const role = localStorage.getItem("role");
    const empid = localStorage.getItem("empid");
    const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

    let url = "http://localhost:8000/leave/apply";

    // If the user is not an admin (based on permissions), fetch only their leaves
    if (!permissions.includes("admin")) {
      url += `?employeeId=${empid}`;
    }

    const response = await axios.get(url);
    setLeaveList(response.data);
    console.log("Fetched Leaves:", response.data);
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};


useEffect(()=>{
  fetchLeaves();
},[]);
const [viewOpen, setViewOpen] = useState(false);
const [selectedLeave, setSelectedLeave] = useState(null);

// Open modal
const handleView = (leave) => {
  setSelectedLeave(leave);
  setViewOpen(true);
};

// Close modal
const handleCloseView = () => {
  setViewOpen(false);
  setSelectedLeave(null);
};
const handleStatusChange = async (id, approved_status) => {
  try {
    await axios.put(`http://localhost:8000/leave/update-status/${id}`, { approved_status });
    fetchLeaves(); 
    handleCloseView();
    
  } catch (error) {
    console.error("Error updating leave status:", error);
  }
};


  return (
    <>
      <Typography variant="h5" gutterBottom>My Leave</Typography>
    
  <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
    <Button
      sx={{ backgroundColor: '#2F70CB', color: 'white' }}
      onClick={handleOpen}
      startIcon={<AddCircleOutlineIcon />}
    >
      Apply Leave
    </Button>
  </Grid>



      <TableContainer sx={{ borderRadius: 2, boxShadow: 3 }}>
  <Table sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow sx={{ backgroundColor: '#2F70CB' }}>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee ID</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Approved Status</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* Example Row */}
      {leaveList.map((leave, index) => (
  <TableRow
    key={leave.id || index}
    hover
    sx={{
      '&:last-child td, &:last-child th': { border: 0 },
      '&:hover': { backgroundColor: '#f5f5f5' },
    }}
  >
    <TableCell>{index + 1}</TableCell>
    <TableCell>{leave.employeeId}</TableCell>
    <TableCell>{leave.employeeName}</TableCell>
    <TableCell>{leave.leaveDate}</TableCell>
    <TableCell>{leave.endDate || '-'}</TableCell>
    <TableCell>
{JSON.parse(localStorage.getItem("permissions") || "[]").includes("admin") ? (
 <select
  value={leave.approved_status || 'Pending'}
  onChange={(e) => handleStatusChange(leave.id, e.target.value)}
  style={{
    padding: "5px",
    fontWeight: "bold",
    color:
      leave.approved_status === "Approved"
        ? "green"
        : leave.approved_status === "Rejected"
        ? "red"
        : "orange"
  }}
>
  <option value="Pending">Pending</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
</select>
) : (
 <Typography
  variant="body2"
  sx={{
    color:
      leave.approved_status === "Approved"
        ? "green"
        : leave.approved_status === "Rejected"
        ? "red"
        : "orange",
    fontWeight: "bold"
  }}
>
  {leave.approved_status || "Pending"}
</Typography>

)}

    </TableCell>
    <TableCell>
      <Button
  size="small"
  variant="outlined"
  color="primary"
  onClick={() => handleView(leave)}
>
  View
</Button>

    </TableCell>
  </TableRow>
))}



    </TableBody>
  </Table>
</TableContainer>


      <ApplyLeaveForm
  open={open}
  onClose={handleClose}
  onSubmit={handleSubmit}
  leaveType={leaveType}
  setLeaveType={setLeaveType}
  leaveCategory={leaveCategory}
  setLeaveCategory={setLeaveCategory}
  leaveDate={leaveDate}
  setLeaveDate={setLeaveDate}
  endDate={endDate}
  setEndDate={setEndDate}
  reason={reason}
  setReason={setReason}
  handleSubmit={handleSubmit}
  
/>
<LeaveDetailsModal
  open={viewOpen}
  onClose={handleCloseView}
  leave={selectedLeave}
  isAdmin={JSON.parse(localStorage.getItem("permissions") || "[]").includes("admin")}
  onApproveReject={handleStatusChange}
/>


    </>
  );
};

export default LeaveApply;
