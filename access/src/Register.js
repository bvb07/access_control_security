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

// const [passwordError, setPasswordErr] = React.useState("");
// const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
// const [passwordInput, setPasswordInput]= React.useState({
//     password:'',
//     confirmPassword:''
// })


export default function SignUp() {
  const [password,setPassword] = React.useState("")
  const [passwordTmp,setPasswordTmp] = React.useState("")
  const [checkpassword,setCheckpassword] = React.useState(false)
  // const [checkpasswordtmp,setCheckpasswordtmp] = React.useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsondata = {
      Username: data.get('Username'),
      Password: data.get('Password'),
      Mail: data.get('Mail'),
      Q1: data.get('Q1'),
      Q2: data.get('Q2'),
      Tmppassword: data.get('Tmppassword')
    }


  if(jsondata.Password.length >=9 ){

    fetch('http://localhost:3333/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsondata),
  })
    .then((response) => response.json())
    .then((data) => {

      // console.log(data.result[0])

      
      

      if(data.status === 'error' || jsondata.Password !== jsondata.Tmppassword){
        alert('register failed \n'+ data.message)
        

      }else{
        alert('register success')
        window.location='/'
        
      }



     })
    .catch((error) => {
      console.error('Error:', error);
  });}else{
    
      alert("Password  >= 9 ")
  }


  
  // if (jsondata.Password !== jsondata.Tmppassword){
  //     console.log("A");
  //     alert("Password not match");
  //     window.location='/'

  // }else{
  //   console.log("B");
  //   alert("Password match");
    
  // }

  
   
  };





  const handleLogout =(even) =>{
    even.preventDefault();
    localStorage.removeItem('token');
    window.location='/'
  }

  const uppercaseRegExp   = /(?=.*?[A-Z])/;
  const lowercaseRegExp   = /(?=.*?[a-z])/;
  const digitsRegExp      = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  // const minLengthRegExp   = /.{8,}/;
  const test2 =(value)=>{
    setPassword(value)
    if(value.length >=9 && uppercaseRegExp.test(value) && lowercaseRegExp .test(value) && digitsRegExp.test(value) && specialCharRegExp.test(value)   ){
      setCheckpassword(true)
    }
    else{
      setCheckpassword(false)
    }
  }
  
 

  


  // const test5 =(value)=>{
  //   if(value.length >=9 && uppercaseRegExp.test(value) && lowercaseRegExp .test(value) && digitsRegExp.test(value) && specialCharRegExp.test(value) && uppercaseRegExp.test(value)   ){
  //     setPassword(value)
  //   }
  //   else{
  //     setPassword("")
  //   }
  // }




 


  



  return (
   
    
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            
            
            
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up 
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  
                  autoComplete="given-name"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                  
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  required
                  fullWidth
                  id="Mail"
                  label="Email Address"
                  name="Mail"
                  autoComplete="Mail"
                />
              </Grid>
              <Grid item xs={12}>


                <TextField

                  required
                  fullWidth
                  error={!checkpassword}
                  name="Password"
                  label="Password"
                  type="Password"
                  id="Password"
                  value={password}
                  onChange={(e)=>test2(e.target.value)}
                  helperText= {!checkpassword?"Password at least 9 characters 4 of the following: uppercase, lowercase, numeric, or special characters":""}

                  
                />
              </Grid>
              <Grid item xs={12}>

                
                
    
                <TextField
                  error={!(password===passwordTmp) || !checkpassword}
                  required
                  fullWidth
                  name="Tmppassword"
                  label="Confirm Password"
                  type="Password"
                  id="Tmppassword"
                  autoComplete="Tmppassword"
                   value={passwordTmp}
                  onChange={(e)=>setPasswordTmp(e.target.value)}

                />
                
                

              </Grid>
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up 
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleLogout}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    
   
  );
}