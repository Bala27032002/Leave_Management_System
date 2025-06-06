import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const AddNewUser = ({closeModal}) => {
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [emailId, setEmailId] = useState('');
  const [role, setRole] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [permissions, setPermissions] = useState({
    admin: false,
    employee: false,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [errors, setErrors] = useState({
    fullName: '',
    employeeId:'',
    role:'',
    joiningDate:'',
    permissions:'',
     password: '',
    confirmPassword: ''

  });

  const validateFullName = (value) => {
    // Regex to allow only alphabetic characters and spaces, and length must be at least 4 characters
    const regex = /^[A-Za-z\s]+$/;
    if (!value) {
      return 'Full Name is required';
    }
    if (value.length < 4) {
      return 'Full Name must be at least 4 characters long';
    }
    if (!regex.test(value)) {
      return 'Full Name can only contain alphabetic characters and spaces';
    }
    return '';
  };
const validateEmployeeId =(value)=>{
  const regex =/^\d{6}$/
  if(!value){
    return 'Employee Id is Required'
  }
  if(!regex.test(value)){
    return "Please Enter correct Id"
  }
  return '';
}

const validateEmailId =(value)=>{
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!value){
    return 'Email id is required';
  }
  else if (!regex.test(value)){
    return 'Please enter correct email Id'
  }
  return '';
}
  
  const validateRole = (value) => {
    if (!value) return 'Role is required';
    return '';
  };

  const validateJoiningDate = (value) => {
    if (!value) return 'Joining Date is required';
    return '';
  };
 const validatePassword=(value)=>{
  if(!value){
    return 'Password Required'

  }
  else if(value.length < 6){
    return 'Must be 6 character'
  }
  return '';
 }

 
const validateConfirmPassword =(value,password)=>{
if(!value){
  return "Required ConfirmPassword";
}
else if(value!==password){
return "do not match"
}
return '';
}


  const validatePermissions = (value) => {
    if (!value.admin && !value.employee) return 'At least one permission selected';
    return '';
  };
  const handleFullNameChange = (e) => {
    const { value } = e.target;
    setFullName(value);
    const error = validateFullName(value);
    setErrors({ ...errors, fullName: error });
  };

  const handleEmployeeIdChange = (e) => {
    const {value}=e.target;
    setEmployeeId(value);
    const error=validateEmployeeId(value);
    setErrors({...errors,employeeId:error})

  };

  const handleEmailIdChange = (e) => {
   const {value}=e.target;
   setEmailId(value);
   const error=validateEmailId(value);
   setErrors({...errors,emailId:error});
  };

  const handleRoleChange = (e) => {
    const {value}=e.target;
    setRole(value);
    const error = validateRole(value);
    setErrors({ ...errors, role: error });
  };

  const handleJoiningDateChange = (e) => {
    setJoiningDate(e.target.value);
    const error = validateJoiningDate(e.target.value);
    setErrors({ ...errors, joiningDate: error });
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setErrors({
      ...errors,
      password: validatePassword(value),
      confirmPassword: validateConfirmPassword(confirmPassword, value),
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setErrors({ ...errors, confirmPassword: validateConfirmPassword(value, password) });
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    const updatedPermissions = {
      ...permissions,
      [name]: checked,
    };
    setPermissions(updatedPermissions);
    const error = validatePermissions(updatedPermissions);
    setErrors({ ...errors, permissions: error });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const fullNameError = validateFullName(fullName);
    const employeeIdError = validateEmployeeId(employeeId);
    const emailIdError = validateEmailId(emailId);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    const roleError = validateRole(role);
    const joiningDateError = validateJoiningDate(joiningDate);
    const permissionsError = validatePermissions(permissions);

    if (fullNameError || employeeIdError || emailIdError || passwordError || confirmPasswordError || roleError || joiningDateError || permissionsError) {
      setErrors({
        fullName: fullNameError,
        employeeId: employeeIdError,
        emailId: emailIdError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        role: roleError,
        joiningDate: joiningDateError,
        permissions: permissionsError,
      });
      return;
    }


    const formData = {
      Name:fullName,
      employeeId :employeeId,
      email_id :emailId,
      role :role,
      joiningDate :joiningDate,
      permissions:permissions,
      password:password
    };
    try{
      const response= await axios.post("http://localhost:8000/auth/signup",formData);
      console.log("response",response.data);
      closeModal()
      window.location.reload()
    }

    catch (error) {
        console.error("Failed to data insert:", error);
      }
  };

  return (
    <>
      <Grid container spacing={2} pl={7} pt={2} style={{background:'white'}}>
        <Grid item xs={12}>
          <Typography variant="h6">Add New User</Typography>
        </Grid>
      </Grid>

      <hr style={{ width: "100%", color: "rgb(217, 217, 217)", marginTop: "10px" }} />

      <form onSubmit={handleSubmit} style={{background:'white'}}>
        <Grid container spacing={2} pl={7} style={{paddingLeft:'15px'}}>
          {/* Left side of the screen */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Full Name</Typography>
            <TextField
              style={{ marginTop: "1px" }}
              fullWidth
              name="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              margin="normal"
              error={!!errors.fullName}
              helperText={errors.fullName}
            />

            <Typography variant="subtitle1">Employee ID</Typography>
            <TextField
              style={{ marginTop: "1px" }}
              fullWidth
              name="employeeId"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              margin="normal"
              error={!!errors.employeeId}
              helperText={errors.employeeId}
            />

            <Typography variant="subtitle1">Email ID</Typography>
            <TextField
              style={{ marginTop: "1px" }}
              fullWidth
              name="emailId"
              value={emailId}
              onChange={handleEmailIdChange}
              margin="normal"
              error={!!errors.emailId}
              helperText={errors.emailId}
            />
            
          <Typography variant="subtitle1">Password</Typography>
          <TextField
           style={{ marginTop: "1px" }}
            type="password"
            fullWidth
            name="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          </Grid>

          {/* Right side of the screen */}
          <Grid item xs={12} sm={6}>
  <Typography variant="subtitle1">Role</Typography>
  <FormControl fullWidth style={{ marginTop: "1px" }} margin="normal">
    <Select
      labelId="role-label"
      name="role"
      value={role}
      onChange={handleRoleChange}
      error={!!errors.role}
      helperText={errors.role}
      
    >
      <MenuItem value="Admin">Admin</MenuItem>
      <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
      <MenuItem value="Business Team">Business Team</MenuItem>
      <MenuItem value="Software Development">Software Development</MenuItem>
      <MenuItem value="Testing">Testing</MenuItem>
      <MenuItem value="UI Designer">UI Designer</MenuItem>
    </Select>
  </FormControl>
  {errors.role && <Typography color="error">{errors.role}</Typography>}


            <Typography variant="subtitle1">Joining Date</Typography>
            <TextField
              style={{ marginTop: "1px" }}
              fullWidth
              name="joiningDate"
              type="date"
              value={joiningDate}
              onChange={handleJoiningDateChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.joiningDate}
              helperText={errors.joiningDate}
            />

            <Typography variant="subtitle1" gutterBottom>
              Company Permissions:
            </Typography>
            <FormControlLabel style={{marginBottom:'1rem'}}
              control={
                <Checkbox
                  name="employee"
                  checked={permissions.employee}
                  onChange={handlePermissionChange}
                />
              }
              label="Employee"
            />
            <FormControlLabel style={{marginBottom:'1rem'}}
              control={
                <Checkbox
                  name="admin"
                  checked={permissions.admin}
                  onChange={handlePermissionChange}
                />
              }
              label="Admin"
            />
                        {errors.permissions && <Typography color="error">{errors.permissions}</Typography>}

                        <Typography variant="subtitle1">Confirm Password</Typography>
          <TextField
           style={{ marginTop: "1px" }}
            type="password"
            fullWidth
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          </Grid>
          <Grid item xs={12} sm={6}>


          
        </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddNewUser;
