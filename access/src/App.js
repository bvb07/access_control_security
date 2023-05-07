import logo from './logo.svg';
import './App.css';
//fuck u pinit
import Button from '@mui/material/Button';

//
const handleLogout =(even) =>{
  even.preventDefault();
  window.location='/login'
}
function App() {
  return (
    <div >    
        <Button variant="contained" onClick={handleLogout}>To login</Button>
      
    </div>
  );
}

export default App;
