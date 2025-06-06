import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const ApplyLeaveForm = ({
  open,
  onClose,
  onSubmit,
  leaveType,
  setLeaveType,
  leaveCategory,
  setLeaveCategory,
  leaveDate,
  setLeaveDate,
  endDate,
  setEndDate,
  reason,
  setReason,
handleSubmit
}) => {
  const handleReset = () => {
    setLeaveType('');
    setLeaveCategory('');
    setLeaveDate('');
    setEndDate('');
    setReason('');
  };

 


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Apply Leave</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth required >
          <InputLabel>Select Leave Type</InputLabel>
          <Select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            label="Select Leave Type"
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            <MenuItem value="One day">One day</MenuItem>
            <MenuItem value="More than one day">More than one day</MenuItem>
            <MenuItem value="Half a day">Half a day</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" required>
          <Typography sx={{ fontSize: '0.9rem', mb: 0.5 }}>Leave Category</Typography>
          <RadioGroup
            row
            value={leaveCategory}
            onChange={(e) => setLeaveCategory(e.target.value)}
          >
            <FormControlLabel
              value="Scheduled"
              control={<Radio />}
              label="Scheduled Leave"
            />
            <FormControlLabel
              value="Unscheduled"
              control={<Radio />}
              label="Unscheduled Leave"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Select Date"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
        />

        {leaveType === "More than one day" && (
          <TextField
            label="End Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        )}

        <TextField
          label="Reason"
          fullWidth
          multiline
          minRows={3}
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box display="flex" justifyContent="flex-end" gap={2} width="100%">
          <Button onClick={handleReset} variant="contained" color="error">
            Reset
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyLeaveForm;
