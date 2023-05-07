import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';




function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.eng.src.ku.ac.th/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {

  const [loading, setLoading] = React.useState(true)
  const [log, setLog] = React.useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('http://localhost:3333/auth2', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token   //' ' เพื่อต่อ token
      },
    })
      .then((response) => response.json())
      .then((data) => {




        console.log(data.log.date)
        if (data.status === 'error') {
          alert('authen failed')
          localStorage.removeItem('token');
          window.location = '/'

        } else {
          setLog(data.log)
          // localStorage.removeItem('token');
          // alert('authen  success')

          setLoading(false)

        }


      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }, [])

  if (loading) {
    return (
      <div> <h1>loading.....</h1> </div>
    )
  }




  const handleLogout = (even) => {
    even.preventDefault();
    localStorage.removeItem('token');
    window.location = '/'
  }

  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />

          <Typography variant="h6" color="inherit" noWrap>
            ADMIN LOGING
          </Typography>

        </Toolbar>
      </AppBar>
      <main>

        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom

            >
              Welcome  To   ADMIN
            </Typography>
            <div>
              <h1>--------------------------------------------------</h1>
              {/* {log.map((data)=>{
                  return(
                    <p>Username :  {data.log_username}</p>
              )
        })} */}

              <table>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Role</th>
                  <th>State</th>

                </tr>

                {log.map((data) => {
                  return (
                    <tr>
                      <td> {data.log_id}   </td>
                      <td> {data.log_username} </td>
                      <td> {data.log_date.split('T')[0]}</td>
                      <td> {new Date(data.log_date).toLocaleString().split(',')[1]}</td>
                      <td> {data.log_role}</td>
                      <td> {data.log_valid?"success":"failed"}</td>
                    </tr>
                  )
                })}
              </table>
            </div>
            <div >
              <Typography variant="h5" align="center" color="text.secondary" paragraph>

              </Typography>


            </div>

            <div> </div>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"

            >
              <Button variant="contained" onClick={handleLogout}>Log Out</Button>

            </Stack>

          </Container>
        </Box>

      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">


        <Copyright />
      </Box>
      {/* End footer */}


    </ThemeProvider>
  );
}