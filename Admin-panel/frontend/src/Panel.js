import React from 'react'
import Image from 'mui-image';
import { Grid,Typography,Button } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
const Panel = () => {
  return (
    <>
    <Header/>
    <Grid container lg={12} sx={{justifyContent:'center',alignItems:'center',marginTop:'80px'}}>
<Grid container lg={9}  sx={{backgroundColor:'#FAF7F7',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Grid container lg={5}>
  <Grid item  lg={12}   >	
								
								
             
              
                          
                          <Image
            duration={0}
            src="https://drive.google.com/uc?export=view&id=1ekijR3DFTbBoovQcHo3zpJGE8TyP1zj6"
            style={{
              width: '339px',
              height: '339px',
            
              transitionDuration: '0',
              animation: '0',
              zIndex: 1,
              borderRadius: '339px',
              marginTop:'76px',marginBottom:'76px'
            // To maintain the aspect ratio of the image within the circle
            }}
          />
                
             
                            
                            
          </Grid>	
  </Grid>
  <Grid container lg={5}>
    <Grid item lg={12}>
      <Typography sx={{fontSize:'36px',fontWeight:'700'}}>Welcome Back!</Typography>
      </Grid>
      <Grid item lg={12}>

      <Typography sx={{fontSize:'20px',fontWeight:'400'}}>Login to check manuscript requests</Typography>
   </Grid>
   <Grid container lg={6} sx={{marginTop:'46px',display:'flex',justifyContent:'space-between'}}>
    <Grid item lg={6} >
    

      
      <Button sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',backgroundColor:'#007F85',borderRadius:'8px',padding:'12px 20px'}}>Sign up</Button>
      
    </Grid>
    <Grid item lg={6} >
   
      <Button sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',backgroundColor:'#007F85',borderRadius:'8px',padding:'12px 20px'}}>Login</Button>
    
    </Grid>
   </Grid>
  </Grid>
</Grid>
    </Grid>
        <Footer/>
    </>
  )
}

export default Panel
