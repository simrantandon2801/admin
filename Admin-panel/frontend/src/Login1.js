import { Password } from '@mui/icons-material';
import { Typography, Grid, Paper,  Button } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {  FormControlLabel, Checkbox } from '@mui/material';
import 'typeface-inter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Api_url } from './helper';
import { styled } from '@mui/system';
import {  Link,  } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #007F85; /* or specify the desired background color */
  }
`;
const Login1 = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false)
  const handleTogglePasswordVisibility2 = () => {
		setShowPassword2((prevShowPassword) => !prevShowPassword);
	  };
  const handleSubmit = async (e) => {
	  e.preventDefault();
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`http://localhost:5000/admin/Login1`, { Email,Password});
      // Handle response from the backend
      console.log(res);
		localStorage.setItem("token", res.data);
		toast.success('One More Step to Get Out for Slush');
		setIsLoading(false);
      navigate('/account')
    } catch (error) {
		console.error(error);
		
		setIsLoading(false);
		toast.error('Invalid Email and Password!');
    }
  
  };
  
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
  return (
    <div>
     <Grid container lg={12} justifyContent="center" alignItems="center" sx={{ backgroundColor: '#007F85', height: '100vh' }}>
	 <ToastContainer />
 
    <Paper sx={{ width: '478px', height: '400px', borderRadius: '26px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <Grid container lg={12} justifyContent="center" alignItems="center">
        <Grid item lg={10} sx={{ textAlign: 'center' ,}}>
          <Typography sx={{ fontSize: '26px', fontFamily: 'Inter', fontWeight: '600', marginTop: '10px' }}>Login</Typography>
        </Grid>
        <Grid item lg={10} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: '400' }}>Discover the next best seller before it hits the shelves!</Typography>
        </Grid>
    
        <Grid item lg={10} sx={{marginTop:'20px'}} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Email</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter your email"
            value={Email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1' }}
          />
        </Grid>
        <Grid item lg={10} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}> Password</Typography>
          <TextField
            required
            fullWidth
						  variant="outlined"
						  type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm password"
            value={Password}
						  size="small"
						  className="custom-textfield"
            onChange={(e) => setPassword(e.target.value)}
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
       
        <Grid item lg={10} sx={{textAlign:'right',marginTop:''}} >
<Button

  sx={{
    mt: 0,
    mb: 2,
  
    borderRadius: '12px',
    textTransform: 'none',

    fontSize: '12px',
    fontFamily:'Inter',
    fontWeight:'400',color:'#007F85',marginTop:'-17px',
  }}
  component={Link}  
      to="/Forget" 
>
Forgot Password?
</Button>
</Grid>
        
  

<Grid item lg={10} >

        <CustomButton onClick={handleSubmit}
          type="submit"
          variant="contained"
          sx={{
            mt: 0,
            mb: 0,
            background: '#007F85',
            borderRadius: '12px',
            textTransform: 'none',
            width: '400px',
            height: '56px',
            fontSize: '20px',
            fontFamily: 'Inter',
            fontWeight: '500'
          }}
        >
          {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Submit'}      
        </CustomButton>
     
        </Grid>
         </Grid>
        
    </Paper>
   
</Grid>

    </div>
  );
};

export default Login1;
