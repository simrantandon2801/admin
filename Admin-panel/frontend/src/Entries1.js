import { Password } from '@mui/icons-material';
import { Typography, Grid, Paper,  Button } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {Box} from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {useNavigate} from 'react-router-dom'
import {  FormControlLabel, Checkbox } from '@mui/material';
import 'typeface-inter';
// import './InputComponent.css';
// import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { Api_url } from './helper';
import { styled } from '@mui/system';
import 'typeface-inter';

const CustomButton = styled(Button)(({ theme, isInvalid }) => ({
	'&:hover': {
	  backgroundColor: isInvalid ? '#ff0000' : '#007f85',
	},
	background: isInvalid ? '#ff0000' : '#007f85',
	borderRadius: '12px',
	textTransform: 'none',
	width: '400px',
	height: '56px',
	fontSize: '20px',
	fontFamily: 'Inter',
	fontWeight: '500',
  }));
const CustomTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
	'& .MuiTooltip-tooltip': {
	  fontSize: '12px',
		  backgroundColor: 'white',
		  borderRadius: '7px',
	  padding:'20px 20px 20px 20px',
	  color: 'black',
	},
  }));
const Entries1 = () => {
	const email1 = localStorage.getItem('email1');
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false)

const handleTogglePasswordVisibility1 = () => {
  setShowPassword1((prevShowPassword) => !prevShowPassword);
	};
	const handleTogglePasswordVisibility2 = () => {
		setShowPassword2((prevShowPassword) => !prevShowPassword);
	  };
	const user = localStorage.getItem('user');
	const useremail=localStorage.getItem('useremail')
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [agreeTerms, setAgreeTerms] = useState(false); 
  const handleSubmit = async (e) => {
	  e.preventDefault();
	  { useremail ? setEmail(useremail) : setEmail(email1) }
	  { user ? setName(user) : setName(Name) }
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`http://localhost:5000/admin/slush`, { Name,Email,Password,confirmPassword});
      // Handle response from the backend
		console.log(res);
		localStorage.removeItem('email');
		localStorage.removeItem('user')
		setIsLoading(false);
      navigate('/Login')
	} catch (error) {
		setIsLoading(false);
      console.error(error);
    }
   
	};
	const isFormValid = () => {
		return (
		  Name.trim() !== '' &&
		  
		  Password.trim() !== '' &&
		  confirmPassword.trim() !== '' &&
		  
		  Password === confirmPassword&&
		  agreeTerms
		);
	  };
    
	  const [anchorEl, setAnchorEl] = React.useState(null);

	  const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handlePopoverClose = () => {
		setAnchorEl(null);
	  };
	
	  const open = Boolean(anchorEl);
    const [Name, setName] = useState('');
	const [Email, setEmail] = useState('');
	
    const [Password, setPassword] = useState('');

    const [confirmPassword, setconfirmPassword] = useState('');
    
	// const [passwordValidation, setPasswordValidation] = React.useState('');

	// const handleHover = () => {
	// 	setPasswordValidation('Must contain a number, special character, and both uppercase and lowercase letters. Must be at least 8 characters in length. Must not contain your name.');
	//   };
	  
	
	const validatePassword = () => {
		// Implement your password validation logic here
		// Return true if password meets the requirements, otherwise false
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
		return (regex.test(Password));
	  };
	
	  const getPasswordValidationMessage = () => {
		let message = '';
		if (Password.length < 8) {
		  message = 'Password must be at least 8 characters in length.';
		} else if (!/\d/.test(Password)) {
		  message = 'Password must contain a number.';
		} else if (!/[a-z]/.test(Password)) {
		  message = 'Password must contain a lowercase letter.';
		} else if (!/[A-Z]/.test(Password)) {
		  message = 'Password must contain an uppercase letter.';
		} else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(Password)) {
		  message = 'Password must contain a special character.';
		} 
		return message;
	  };
  return (
   
     <Grid container spacing={0} lg={12} justifyContent="center" alignItems="center" sx={{ backgroundColor: '#007F85', minHeight:"100vh"}}>
 
 
    <Paper sx={{ width: '478px', height: '621px', borderRadius: '26px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <Grid container lg={12} justifyContent="center" alignItems="center">
        <Grid item lg={10} sx={{ textAlign: 'center' ,}}>
          <Typography sx={{ fontSize: '26px', fontFamily: 'Inter', fontWeight: '600', marginTop: '10px' }}>Just a second!</Typography>
        </Grid>
        <Grid item lg={10} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: '400' }}>Discover the next best seller before it hits the shelves! </Typography>
        </Grid>
        <Grid item lg={10} sx={{ marginTop: '20px' }}>
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Name</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter your name"
            value={user?user:Name}
						  size="small"
						  disabled={user ? true : false}
						  className="custom-textfield"
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1', }}
          />
        </Grid>
        <Grid item lg={10} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Email</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter your email"
            value={useremail?useremail:email1}
						  size="small"
						
            disabled={email1?true:false}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1' }}
          />
        </Grid>
        <Grid item lg={10}>
					  <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>New Password
						  <CustomTooltip title={
							  <Box sx={{background:'white'}}>
        <Typography variant="body2" sx={{background:'white',color:'black'}}>
          <strong>Password requirements:</strong>
          <br />
          Must contain a number, special character, and both uppercase and lowercase letters.
          <br />
          Must be at least 8 characters in length.
          <br />
          Must not contain your name.
								  </Typography>
								  </Box>
      } arrow style={{fontSize:"12px",color:'black',background:'white'}}>
    <IconButton>
      <InfoIcon />
    </IconButton>
  </CustomTooltip></Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
						  placeholder="Enter password"
						  type={showPassword1 ? 'text' : 'password'}
            value={Password}
						  size="small"
						  className="custom-textfield"
						  error={!validatePassword()}
						  helperText={getPasswordValidationMessage()}
						  InputProps={{ style: { height: "40px" },endAdornment: (
							<InputAdornment position="end">
							  <IconButton onClick={handleTogglePasswordVisibility1} edge="end">
								{showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
							  </IconButton>
							</InputAdornment>
						  ), }}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1','& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
				borderColor: 'red',
			  }, }}
          />
        </Grid>
        <Grid item lg={10} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Confirm Password</Typography>
          <TextField
            required
            fullWidth
						  variant="outlined"
						  type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
						  size="small"
						  className="custom-textfield"
            onChange={(e) => setconfirmPassword(e.target.value)}
						  sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1' }}
						  InputProps={{ style: { height: "40px" },endAdornment: (
							<InputAdornment position="end">
							  <IconButton onClick={handleTogglePasswordVisibility2} edge="end">
								{showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
							  </IconButton>
							</InputAdornment>
						  ), }}
          />
        </Grid>
        
       
   
    <Grid item lg={10}>
  <FormControlLabel
    control={<Checkbox   checked={agreeTerms}
	onChange={(e) => setAgreeTerms(e.target.checked)}
  />}
    label={
      <span >
        By clicking this box, you agree to our
        <span style={{ color: '#007F85' }}> Terms of Service</span>
        {' '}
        and  <span style={{ color: '#007F85' }}> Privacy Policy.</span>
        {' '}
      </span>
    }
  />
</Grid>

<Grid item lg={10} sx={{marginTop:'20px',marginBottom:'20px'}}>

					  <CustomButton onClick={handleSubmit}
						  type="submit"
						  variant="contained"
						  className="light"
						  sx={{
							  mt: 0,
							  mb: 0,
							  background:"#007F85",
            borderRadius: '12px',
            textTransform: 'none',
            width: '400px',
            height: '56px',
            fontSize: '20px',
            fontFamily: 'Inter',
            fontWeight: '500'
						  }}
						  isInvalid={!isFormValid()}
						  disabled={!isFormValid() || isLoading}
        >
     {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Submit'}         
        </CustomButton>
     
        </Grid>
         </Grid>
        
    </Paper>
   
</Grid>

   
  );
};

export default Entries1;