import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


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

const forgot =(even) =>{
  even.preventDefault();
  window.location='/forgot'
}



const theme = createTheme();

export default function SignInSide() { 
  let tmp =new Date();
  let text = tmp.toISOString();
  let text2 = text.split('T')[0]
  console.log(text2);
  console.log(text);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    


    


    const jsondata = {
      Username: data.get('Username'),
      Password: data.get('Password'),
      

    }


    fetch('http://localhost:3333/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsondata),
  })
    .then((response) => response.json())
    .then((data) => {

      // console.log(data.user[0].Role)

      // console.log(data)

      console.log(data)

      
     
      if(data.status === 'error'){
        
        alert(' login failed')

        

      }else{
        localStorage.setItem('token',data.token)
        

        window.location ='/album'
        alert('login success')
        // if(data.user[0].Role === 'Admin'){
        //     window.location ='/Admin'
        //     alert('login Admin success')

        // }else{
        
        // }
        

        

      }
      

     })
    .catch((error) => {
      console.error('Error:', error);
  });

};

const handleRegister =(even) =>{
  even.preventDefault();
  localStorage.removeItem('token');
  window.location='/register'
}




React.useEffect(()=>{
  const token =localStorage.getItem('token')
  fetch('http://localhost:3333/auth', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token   //' ' เพื่อต่อ token
    },
})
  .then((response) => response.json())
  .then((data) => {

  
  // console.log(data.results[0])

    if(data.status === 'error'){
      localStorage.removeItem('token');
      // window.location = '/'
      
    }else{ 
      window.location = '/album'
    }
  
   })
  .catch((error) => {
    console.error('Error:', error);
});


},[])
  return (
    <div className='App'>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.discordapp.com/attachments/871768018890416138/1027221117833859092/unknown.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
          }}
         
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

          
          <Box
            sx={{
              my: 10,    //8
              mx: 8,    //4
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              

              
            }}

        
          
          >

            <Avatar sx={{ m:1, bgcolor: 'secondary.main' }}>
              <AdminPanelSettingsIcon />
            </Avatar>


            <Typography component="h1" variant="h4">
              Sign In  Computer Security
            </Typography>
            <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}    >
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username "
                name="Username"
                autoComplete="Username"
                autoFocus
                color="secondary"
                focused
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="Password"
                id="Password"
                autoComplete="current-Password"
                color="secondary"
                focused
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"


              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={forgot}>
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2"  onClick={handleRegister}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
}