import React,{useContext} from 'react'
import { AppBar,Container,MenuItem,Select,Toolbar, Typography } from '@material-ui/core'
import { ThemeProvider, createTheme} from '@mui/material/styles'
import { useNavigate } from "react-router-dom";
import './HeaderCompo.css'
import { CryptoContextAPI } from '../../CryptoContext';

const darkTheme = createTheme({
  palette: {
    primary:{
      main:'#fff',
    },
    type:'dark'
  },
});
const HeaderCompo = () => {
  const a = useContext(CryptoContextAPI)
  // console.log(a)
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={darkTheme}>
    <div className='headerDIV'>
    
    <AppBar color='primary' position='static'></AppBar>
        <Container>
          <Toolbar>
          <Typography variant='h5' onClick={()=>{ navigate('/')}} className='title'>Crypto Hunter</Typography>
          
            <Select variant='outlined' value={a.currency} onChange={(e)=> a.setcurreny(e.target.value)} style={{width:100,height:40,marginRight:15}} className='selectHeader'>
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>

            </Toolbar>
        
        
            </Container>
            <hr></hr>
            </div>
            </ThemeProvider>
  )
}


export default HeaderCompo