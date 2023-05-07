import  React,{useEffect} from 'react';
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

  const [loading,setLoading] = React.useState(true)

  
  useEffect(()=>{
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

    console.log(data) 

      if(data.status === 'error'){
        alert('authen failed')
        localStorage.removeItem('token');
        window.location = '/'
        
      }
      else if(data.decoded.Role ==="Admin"){
        window.location = '/Admin'

      }
      else{
        // localStorage.removeItem('token');
        // alert('authen  success')
        let ndate = new Date()
        let ndate2 = new Date(data.decoded.date.split('T')[0])
        // console.log(ndate.toISOString() + " " + ndate2.toISOString());
        console.log(data.decoded.Role)

        var Difference_In_Time = ndate.getTime() - ndate2.getTime();

        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        // console.log(Difference_In_Days)

        setLoading(false)
        
        if(Difference_In_Days >= 90){
          alert("You use password more 90 days Please reset password")

          window.location='/reset/'+ token

        }       
      }
      

     })
    .catch((error) => {
      console.error('Error:', error);
  });


  },[])

  const handleLogout =(even) =>{
    even.preventDefault();
    localStorage.removeItem('token');
    window.location='/'
  }

  if(loading){
    return(
      <div > <h1>loading.......</h1> </div>
    )
  }

  return (
    
    <ThemeProvider theme={theme}>
      
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />

          <Typography variant="h6" color="inherit" noWrap>
             Jouney's End
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
              Welcome  To   KuiraiD
            </Typography>
            <div>
              <h1>--------------------------------------------------</h1>
            </div>
            <div >
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              นายพงศธร    สว่างเกล้า  6230300621 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              นายณัฎฐ์      บุญมี     6230300320
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              นายพิณิชย์    เเพทอง   6230300729
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              นายพศุตม์    มานะจิตต์   6230300681
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              นายวรวิทย์     นันทะสุ    6230300869
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              นางสาวสุพรรณิการ์ ยอดรัก  6230301016
            </Typography>
            
            </div>
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
       
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          You can see  Computer Engineering and Informatics Website
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}

      
    </ThemeProvider>
  );
}