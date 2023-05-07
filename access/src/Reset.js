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
import { useParams } from 'react-router-dom';

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

export default function Reset() {

  const [password,setPassword] = React.useState("")
  const [passwordTmp,setPasswordTmp] = React.useState("")
  const [checkpassword,setCheckpassword] = React.useState(false)

  const test = useParams()
  const [loading, setLoading] = React.useState(true)
  
  const [data, setData] = React.useState(null)
  console.log(test);
  const handleSubmit = (event) => {
    event.preventDefault();
    //setData({Mail:"TEST" , Id:"100"})
    const data1 = new FormData(event.currentTarget);
    // if (jsondata.Password !== jsondata.Tmppassword){
    //     console.log("A");
    //     alert("Password not match");
    //     window.location='/'

    // }else{
    //   console.log("B");
    //   alert("Password match");

    // }
   

    const jsondata ={
      Password: data1.get('Password'),
      Mail: data.Mail,

    }

    const token = test.token

    fetch('http://localhost:3333/reset', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(jsondata),
    })
      .then((response) => response.json())
      
      .then((data) => {
        if (data.status === 'error') {
          alert('failed')
          window.location = '/'

        } else {
          //alert('success')
          // console.log(data);
          localStorage.removeItem('token');
          window.location='/'  
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });




  };





  // const handleLogout =(even) =>{
  //   even.preventDefault();
  //   localStorage.removeItem('token');
  //   window.location='/'
  // }








  React.useEffect(() => {
    const token = test.token
    fetch('http://localhost:3333/auth', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'error') {
          alert('failed')
          window.location = '/'

        } else {
          // alert('success')
          // console.log(data);
          setData({ Mail: data.decoded.Mail, Id: data.decoded.Id })
          setLoading(false)
          // window.location = '/'
          
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, [])










  const uppercaseRegExp   = /(?=.*?[A-Z])/;
  const lowercaseRegExp   = /(?=.*?[a-z])/;
  const digitsRegExp      = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  // const minLengthRegExp   = /.{8,}/;
  const test2 =(value)=>{
    setPassword(value)
    if(value.length >=9 && uppercaseRegExp.test(value) && lowercaseRegExp .test(value) && digitsRegExp.test(value) && specialCharRegExp.test(value) ){
      setCheckpassword(true)
    }
    else{
      setCheckpassword(false)
    }
  }





  if (loading) {
    return (
      <div><h1>loading....</h1></div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <h1>{data?.Mail}   {data?.Id}</h1> */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            RESET
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>



              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Mail"
                  label="Email Address"
                  name="Mail"
                  autoComplete="Mail"
                />
              </Grid> */}


              <Grid item xs={12}>
                <TextField
                  error={!checkpassword}
                  required
                  fullWidth
                  name="Password"
                  label="New Password"
                  type="Password"
                  id="Password"
                  autoComplete="Password"
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
                  label="confirm Password"
                  type="Password"
                  id="Tmppassword"
                  autoComplete="Tmppassword"
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
              RESET
            </Button>
            <Grid container justifyContent="flex-end">

            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}