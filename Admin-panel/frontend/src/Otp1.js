import React, { useState,useEffect } from 'react';
import { Typography,Grid,Paper,TextField ,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Api_url } from './helper';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #007F85; /* or specify the desired background color */
  }
`;
const Otp1 = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
	  e.preventDefault();
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`http://localhost:5000/admin/Otp1`, { Otp});
      // Handle response from the backend
		console.log(res);
		setIsLoading(false);
      navigate('/Entries1')
	} catch (error) {
		setIsLoading(false);
      console.error(error);
    }
   

   setOtp('');
  }
  const gotoLogin = () => { 
		navigate('/Entries1')
	}

    const [Otp,setOtp] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(30);
  useEffect(() => {
    let interval = null;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleResendClick = async (e)=> {
    setRemainingTime(30);
	  setIsButtonDisabled(true);
	  const Email = localStorage.getItem('email1');}

  return (
    <>
       <Grid container lg={12} justifyContent="center" alignItems="center" sx={{backgroundColor:'#007F85',     height: '100vh'}}>
<Grid item lg={12} sx={{justifyContent:'center',display:'flex',alignItems:'center'}}>
    <Paper sx={{ width: '478px', height: '336px',borderRadius:'26px',justifyContent:'center',display:'flex',alignItems:'center'}}>
      <Grid container lg={11} justifyContent="center" alignItems="center">
        <Grid item lg={5} sx={{textAlign:'center'}}>
        <Typography sx={{fontSize:'26px',fontFmaily:'Inter',fontWeight:'600'}}>Almost there !</Typography>
      </Grid>
      <Grid item lg={12}sx={{textAlign:'center'}} >
        <Typography sx={{fontSize:'12px',fontFmaily:'Inter',fontWeight:'400' }}>Discover the next best seller before it hits the shelves!</Typography>
      </Grid>
      <Grid item lg={10} sx={{marginTop:'20px'}}>
  <Typography sx={{textAlign:'left', fontSize:'16px', fontWeight:'700', fontFamily:'Inter'}}>One Time Password</Typography>
  <TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter OTP"
    value={Otp}
    size="small"
    onChange={(e) => setOtp(e.target.value)}
    sx={{ mb: 2, borderRadius: '6px',backgroundColor:  '#F4F1F1' }} 
  />
</Grid>
<Grid container lg={10} sx={{marginTop:'-20px'}} >
<Grid item lg={6} >
<Button onClick={gotoLogin}

  sx={{
    mt: 0,
    mb: 2,
  
    borderRadius: '12px',
    textTransform: 'none',

    fontSize: '12px',
    fontFamily:'Inter',
    fontWeight:'400',color:'#007F85'
  }}
>
Didn’t receive the OTP?
								  </Button>
								  {remainingTime > 0 && (
        <Typography sx={{fontSize: '12px',
		fontFamily:'Inter',fontWeight:'400',color:'#007F85',marginBottom:'10px'}}>
           Resend the Otp after - <strong>{remainingTime}s</strong>
        </Typography>
      )}
							  </Grid>
						
<Grid item lg={6} sx={{display:'flex',justifyContent:'end'}} >

								  <Button onClick={handleResendClick}
	                                 disabled={isButtonDisabled}
									  sx={{
										  mt: '-6px',
										  mb: 2,
  
										  borderRadius: '12px',
										  textTransform: 'none',

										  fontSize: '12px',
										  fontFamily: 'Inter',
										  fontWeight: '400', color: '#007F85'
									  }}
								  >
									  Resend OTP
								  </Button>
</Grid>
</Grid>
<CustomButton  onClick={handleSubmit}
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
  {isLoading ? <CircularProgress style={{color:"#ffffff"}} />: 'Verify'} 
    </CustomButton>

      </Grid>
    </Paper>
    </Grid>
</Grid>
    </>
  )
}

export default Otp1
