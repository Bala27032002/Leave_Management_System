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
  IconButton,
  FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ApplyLeaveForm = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
  initialValues: {
    leaveType: '',
    leaveCategory: '',
    leaveDate: '',
    endDate: null,
    reason: ''
  },
  validationSchema: Yup.object({
    leaveType: Yup.string().required('Leave type is required'),
    leaveCategory: Yup.string().required('Leave category is required'),
    leaveDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().when('leaveType', (leaveType, schema) => {
      if (leaveType === 'More than one day') {
        return schema.required('End date is required');
      }
      return schema.notRequired();
    }),
    reason: Yup.string().required('Reason is required')
  }),
  onSubmit: (values) => {
    onSubmit(values);
    formik.resetForm();
  }
});


  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h6">Apply Leave</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Leave Type */}
          <FormControl fullWidth required error={formik.touched.leaveType && Boolean(formik.errors.leaveType)}>
            <InputLabel>Select Leave Type</InputLabel>
            <Select
              name="leaveType"
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Select Leave Type"
            >
              <MenuItem value=""><em>Select</em></MenuItem>
              <MenuItem value="One day">One day</MenuItem>
              <MenuItem value="More than one day">More than one day</MenuItem>
              <MenuItem value="Half a day">Half a day</MenuItem>
            </Select>
            <FormHelperText>{formik.touched.leaveType && formik.errors.leaveType}</FormHelperText>
          </FormControl>

          {/* Leave Category */}
          <FormControl component="fieldset" error={formik.touched.leaveCategory && Boolean(formik.errors.leaveCategory)}>
            <Typography sx={{ fontSize: '0.9rem', mb: 0.5 }}>Leave Category</Typography>
            <RadioGroup
              row
              name="leaveCategory"
              value={formik.values.leaveCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <FormHelperText>{formik.touched.leaveCategory && formik.errors.leaveCategory}</FormHelperText>
          </FormControl>

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            name="leaveDate"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.leaveDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.leaveDate && Boolean(formik.errors.leaveDate)}
            helperText={formik.touched.leaveDate && formik.errors.leaveDate}
          />

          {/* End Date (conditional) */}
         {formik.values.leaveType === 'More than one day' && (
  <TextField
    label="End Date"
    type="date"
    name="endDate"
    fullWidth
    InputLabelProps={{ shrink: true }}
    value={formik.values.endDate || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={Boolean(formik.errors.endDate)}
    helperText={formik.errors.endDate}
  />
)}


          {/* Reason */}
          <TextField
            label="Reason"
            name="reason"
            fullWidth
            multiline
            minRows={3}
            value={formik.values.reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.reason && Boolean(formik.errors.reason)}
            helperText={formik.touched.reason && formik.errors.reason}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Box display="flex" justifyContent="flex-end" gap={2} width="100%">
            <Button onClick={handleReset} variant="outlined" color="error">
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ApplyLeaveForm;
