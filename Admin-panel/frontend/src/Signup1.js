import React  from 'react'
import { Typography,Grid,Paper,TextField ,Button} from '@mui/material'
import 'typeface-inter';
import { styled } from '@mui/system';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #007F85; /* or specify the desired background color */
  }
`;
const Signup1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
	  e.preventDefault();
    const email1 = localStorage.setItem('email1', Email);
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`http://localhost:5000/admin/sign1`, { Email});
    
	  
		console.log(res);
		setIsLoading(false);
      navigate('/Otp1')
	} catch (error) {
		setIsLoading(false);
      console.error(error);
    }
   

    setEmail('')
  
  }
  const [Email,setEmail] = useState('');
  return (
    <>
     <Grid container lg={12} justifyContent="center" alignItems="center" sx={{backgroundColor:'#007F85',     height: '100vh'}}>
<Grid item lg={12} sx={{justifyContent:'center',display:'flex',alignItems:'center'}}>
    <Paper sx={{ width: '478px', height: '315px',borderRadius:'26px',justifyContent:'center',display:'flex',alignItems:'center'}}>
      <Grid container lg={11} justifyContent="center" alignItems="center">
        <Grid item lg={12} sx={{textAlign:'center'}}>
        <Typography sx={{fontSize:'26px',fontFmaily:'Inter',fontWeight:'600'}}>Sign Up with Slushie!</Typography>
      </Grid>
      <Grid item lg={12}sx={{textAlign:'center'}} >
        <Typography sx={{fontSize:'12px',fontFmaily:'Inter',fontWeight:'400' }}>Discover the next best seller before it hits the shelves!</Typography>
      </Grid>
      <Grid item lg={10} sx={{marginTop:'20px'}}>
  <Typography sx={{textAlign:'left', fontSize:'16px', fontWeight:'700', fontFamily:'Inter'}}>Email</Typography>
  <TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter your email"
    value={Email}
    size="small"
    onChange={(e) => setEmail(e.target.value)}
    sx={{ mb: 2, borderRadius: '6px',backgroundColor:  '#F4F1F1', }} 
  />
</Grid>
<CustomButton onClick={handleSubmit}
      type="submit"
      variant="contained"
      sx={{
        mt: 0,
        mb: 0,
        background: '#007F85',
        borderRadius: '12px',
        textTransform: 'none',
        width: '366px',
        height: '56px',
        fontSize: '20px',
        fontFamily:'Inter',
        fontWeight:'500'
        
      }}
    >
							  {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Submit'}    
    </CustomButton>
	
      </Grid>
    </Paper>
    </Grid>
</Grid>
    </>
  )
}

export default Signup1
