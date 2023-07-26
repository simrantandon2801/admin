

// MyAccountPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Grid } from '@mui/material';
import Footer from './Footer';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography,TextField,Button,Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { Api_url } from './helper';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'typeface-inter';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #007F85; /* or specify the desired background color */
  }
`;
const Account = () => {
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false)
	const [isLoading, setIsLoading] = useState(false);
const handleTogglePasswordVisibility1 = () => {
  setShowPassword1((prevShowPassword) => !prevShowPassword);
	};
	const handleTogglePasswordVisibility2 = () => {
		setShowPassword2((prevShowPassword) => !prevShowPassword);
	  };
	const [user, setUser] = useState({});
	const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [imageselect, setImageSelected] = useState(null);
	const [is, setis] = useState(null);
  const token = localStorage.getItem("token");
	const decoded = jwt_decode(token);
	const [photoUrl, setPhotoUrl] = useState(null);
	const photourl1='https://drive.google.com/uc?export=view&id=1EgKiblMctjLrg256i6b9fI-mrq7LOVIE'
  const userId = decoded._id;
  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
		const token = localStorage.getItem("token");
		if (!token) {
		  setError('Token not found.');
		  return;
		}
	
		const decoded = jwt_decode(token);
		const userId = decoded._id;
	console.log(userId)
		const response = await fetch(`${Api_url}/admin/user/${userId}`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		  },
		});
		if (response.ok) {
		  const data = await response.json();
		  console.log(data)
		setUser(data);
	  } else {
		// Handle error response
		const errorData = await response.json();
		setError(errorData.error);
	  }
	} catch (error) {
	  console.error(error);
	  setError('Failed to fetch user data.');
	}
  };
	useEffect(() => { 
		const fetchPhoto = async () => {
			try {
				console.log(user._id);
				const response = await axios.get(`${Api_url}/admin/users/photo/${userId}`, {
					responseType: 'arraybuffer',
					headers: {
						Accept: 'image/png, image/jpeg',
					},
				});
				console.log(response.data);
				const blob = new Blob([response.data], { type: response.headers['content-type'] });
				const url = URL.createObjectURL(blob);
				setPhotoUrl(url);
			} 
			  catch (error) {
				  console.error(error);
				}
		 }
		fetchPhoto();
	}, [user._id]);
	const handleImageUpload1 = (event) => {
		const imageFile = event.target.files[0];
		setis(imageFile);
		console.log(imageFile,'fliee')
		setImageSelected(URL.createObjectURL(imageFile));
	  };

  const handleImageUpload = async (event) => {
	 
    const formData = new FormData();
	  formData.append('photo', is);
	  formData.append('userId',userId)
	  try {
		const response = await axios.post(`${Api_url}/admin/users/photo`, formData, {
		  headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		});
		toast.success('Profile Photo Updated Successfully');
		  console.log(response.data);
		  window.location.reload()
	  } catch (error) {
		  console.error(error);
		  toast.error('Error Coming in Updating Photo');
		setError('Something went wrong');
	  }
	  
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
	  setOpenDialog(false);
	  setNewPassword('');
	  setConfirmPassword('');

	  
  };
  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await axios.post(`http://localhost:5000/admin/update-password`, { newPassword,user }); 
        setNewPassword('');
        setConfirmPassword('');
        alert('Password updated successfully');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Passwords do not match');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     // Replace 123 with the actual user ID
	  toast.error('Please Save the Change Before Moving');
    } catch (error) {
      console.error(error);
    }
  };

  return (
	  <div>
		  <Header />
		  <Grid container lg={9} sx={{ margin: 'auto' }}>
			  <Grid item lg={12} sx={{marginTop:"32px",marginBottom:"56px"}}>
			  <Typography sx={{fontSize:'36px',fontFamily:'Inter'}}>My Account</Typography>  
			  </Grid>
			 
		  </Grid>
		  <ToastContainer />
		  <Grid container lg={9} sx={{ margin: 'auto', borderRadius: '12px', backgroundColor: '#FAF7F7' }}>
			  <Grid container lg={12} sx={{margin:'46px'}}>
		  <Grid container lg={2.5}>
				   
				  {imageselect ? <img src={imageselect} alt="Profile52" style={{width:'188px',height:'188px',borderRadius:'188px'}} />:<img src={photoUrl} alt="Profilephoto" style={{width:'188px',height:'188px',borderRadius:'188px'}} />}  
				  
					 
          
        
      
				  <input type="file" id="file-input" accept="image/*" onChange={handleImageUpload1} style={{ display: 'none' }} />
			  <Grid item lg={12}>
			  <label htmlFor="file-input">
				  <Typography sx={{
						  color: '#007F85', lineHeight: "24px", fontSize:'16px'}}>
					  Change Profile Photo  
						  </Typography>
						  </label>
				  </Grid>	
			  </Grid>
			  <Grid container lg={7.5} justifyContent="center" sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <Grid container item lg={11} spacing={2}>
					  <Grid item lg={6.5}>
						  <Typography>Name</Typography>
          <TextField
            variant="outlined"
            fullWidth
								  value={user.Name}
								  InputProps={{ style: { height: "40px" } }}
            onChange={(e) => setUser({ ...user, Name: e.target.value })}
       disabled    />
        </Grid>
					  <Grid item lg={6.5}>
					  <Typography>Email</Typography>
          <TextField
          
            variant="outlined"
								  fullWidth
								  InputProps={{ style: { height: "40px" } }}
            value={user.Email}
            disabled
          />
					  </Grid>
					  <Grid item lg={6.5}>
					  <Typography>Password</Typography>
          <TextField
           
            variant="outlined"
							  fullWidth
							  type="password"
								  value={user.Password}
								  InputProps={{ style: { height: "40px" } }}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
						  />
						  <Typography onClick={handleOpenDialog} sx={{
							  textAlign: "end",fontFamily: 'Inter',fontSize: '14px',color:'#007F85'}}>Change Password</Typography>
					  </Grid>
						  <Dialog open={openDialog} onClose={handleCloseDialog} style={{ borderRadius: "26px" }}>
							  <Button onClick={handleCloseDialog} style={{ justifyContent: 'flex-end',marginRight:'36px',marginTop:'16px' }}><ClearIcon style={{ color: "#1E1E1E" }} /></Button>
        <DialogTitle style={{fontFamily: 'Inter',fontSize: '26px',textAlign:'center', fontWeight:'600',overflow:'hidden',marginTop:'-30px'}}>Change Password </DialogTitle>
        <DialogContent style={{width:"366px",height:"208px",}}>
         <Typography  style={{fontFamily: 'Inter',fontSize: '16px',fontWeight:"700",textAlign:'initial'}}>Password</Typography>
								  <TextField
           
            type={showPassword2 ? 'text' : 'password'}
            variant="outlined"
									  fullWidth
									  InputProps={{ style: { height: "40px" },endAdornment: (
										<InputAdornment position="end">
										  <IconButton onClick={handleTogglePasswordVisibility2} edge="end">
											{showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										  </IconButton>
										</InputAdornment>
									  ), }}
								  value={confirmPassword}
								  onChange={(e) => setConfirmPassword(e.target.value)}
								  />
								  <Typography  style={{fontFamily: 'Inter',fontSize: '16px',fontWeight:"700",textAlign:'initial',marginTop:"13px"}}>New Password</Typography>
          <TextField
           
            type={showPassword1 ? 'text' : 'password'}
            variant="outlined"
									  fullWidth
									  InputProps={{ style: { height: "40px" },endAdornment: (
										<InputAdornment position="end">
										  <IconButton onClick={handleTogglePasswordVisibility1} edge="end">
											{showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										  </IconButton>
										</InputAdornment>
									  ), }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
								  />
								   <CustomButton onClick={handleChangePassword}
          type="submit"
          variant="contained"
		  sx={{background:'#007F85',textTransform:'none',width:'366px',marginTop:'26px'}}
        >
          {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Change Password'}      
        </CustomButton>
        </DialogContent>
       
      </Dialog>
		
		
       
      </Grid>
				  </Grid>
				  <Grid container lg={11.5}>
					  
				  <Grid container lg={12} sx={{justifyContent:'end',display:'flex',marginTop:'76px'}}>
						  <Grid item lg={10.2} sx={{justifyContent:'end',display:'flex'}}>
						  <Button type="submit" style={{ color: "#007F85", border: '1px solid #007F85', textTransform: 'none',width:'53px' }} onClick={handleSubmit}>
            Cancel
						  </Button>  
						  </Grid>
						  <Grid item lg={1.8} sx={{justifyContent:'end',display:'flex'}}>
						  <Button type="submit" style={{ backgroundColor: "#007F85",textTransform:'none',borderRadius:"8px"}} variant="contained" onClick={handleImageUpload}>
            Save Changes
          </Button> 
							  </Grid>
						  
						  
        </Grid>  
				 </Grid>
			  </Grid>
			    
		  </Grid>
		  
    
      <Footer />
    </div>
  );
};

export default Account;
