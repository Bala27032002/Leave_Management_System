import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Divider
} from '@mui/material';

const LeaveDetailsModal = ({ open, onClose, leave, isAdmin, onApproveReject }) => {
  if (!leave) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      default: return 'warning';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, p: 1 }}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Leave Request Details
        </DialogTitle>

        <DialogContent>
          <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Employee ID</Typography>
                <Typography variant="body1">{leave.employeeId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Employee Name</Typography>
                <Typography variant="body1">{leave.employeeName}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Leave Type</Typography>
                <Typography variant="body1">{leave.leaveType}</Typography>
              </Grid>
             

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Start Date</Typography>
                <Typography variant="body1">{leave.leaveDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">End Date</Typography>
                <Typography variant="body1">{leave.endDate || '-'}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Reason</Typography>
                <Typography variant="body1">{leave.reason}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Approval Status</Typography>
                <Chip
                  label={leave.approved_status}
                  color={getStatusColor(leave.approved_status)}
                  variant="filled"
                  sx={{ fontWeight: 'bold' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Approved Date</Typography>
                <Typography variant="body1">{leave.approvedDate || '-'}</Typography>
              </Grid>

             

              {isAdmin && (
                <>
                  <Grid item xs={12}><Divider sx={{ my: 2 }} /></Grid>
                  <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    <Button
                      onClick={() => onApproveReject(leave.id, "Approved")}
                      variant="contained"
                      color="success"
                      sx={{
                        mr: 2,
                        px: 3,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 2,
                        '&:hover': { backgroundColor: '#388e3c' }
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => onApproveReject(leave.id, "Rejected")}
                      variant="contained"
                      color="error"
                      sx={{
                        px: 3,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 2,
                        '&:hover': { backgroundColor: '#d32f2f' }
                      }}
                    >
                      Reject
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default LeaveDetailsModal;
