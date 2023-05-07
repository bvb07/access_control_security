import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'
// import Check from './Check.js'

import CoPresentIcon from '@mui/icons-material/CoPresent';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.eng.src.ku.ac.th/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsondata = {
     
      Mail: data.get('Mail'),
      Q1: data.get('Q1'),
      Q2: data.get('Q2')
    }


 

    fetch('http://localhost:3333/forgot', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsondata),
  })
    .then((response) => response.json())
    .then((data) => {

    // console.log(data)

    // console.log(data.result)
    
      
    // console.log(data.result[0].date)

      if(data.status === 'Not found' ||  data.result.length === 0){
        alert('forget failed')
        window.location='/'
        

      }else{
        alert(' success')
        // console.log(data.result[0].Id);

        window.location='/reset/'+data.token

        
      }



     })
    .catch((error) => {
      console.error('Error:', error);
  });


  
  // if (jsondata.Password !== jsondata.Tmppassword){
  //     console.log("A");
  //     alert("Password not match");
  //     window.location='/'

  // }else{
  //   console.log("B");
  //   alert("Password match");
    
  // }

  
   
  };





  // const handleLogout =(even) =>{
  //   even.preventDefault();
  //   localStorage.removeItem('token');
  //   window.location='/'
  // }

  

 


  



  return (
    <div className='App'>
       

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <CoPresentIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            FORGOT 
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={4}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Mail"
                  label="Email Address"
                  name="Mail"
                  autoComplete="Mail"
                  color="secondary"
                  focused
                />
              </Grid>
              
              <Grid item xs={12} >
                <TextField
          
                  required
                  fullWidth
                  id="Q1"
                  label="What was your favorite subject in high school ?"
                  name="Q1"
                  autoComplete="Q1"
                  color="secondary"
                  focused
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField 
                  required
                  fullWidth
                  id="Q2"
                  label="What is your favorite song ?"
                  name="Q2"
                  autoComplete="Q2"
                  color="secondary"
                  focused
                />
              </Grid>
             
              
              
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}