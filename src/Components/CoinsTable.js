import React,{useState,useContext, useEffect} from 'react'
import axios from 'axios';
import { CoinList } from '../config/api';
import { CryptoContextAPI } from '../CryptoContext';
import './CoinsTable.css'
import { Container,Typography,TextField,createTheme,ThemeProvider } from '@mui/material';


const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
const CoinsTable = () => {
    const currency = useContext(CryptoContextAPI)
    // console.log(currency)
    const [search, setsearch] = useState('')
    const [coin, setcoin] = useState([]);
    const [loading, setloading] = useState(false)

    const fetchCoins = async() =>{
        setloading(true)
        const res = await axios.get(CoinList(currency.currency))
        // console.log(res.data)
        setcoin(res.data)
        setloading(false)
    }
    useEffect(()=>{
        fetchCoins()
    },[currency.currency])

    const handleSearch = ()=>{
        return coin.filter((coin)=>{
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        })
    }
  return (
    <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:'center'}}>
    <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat",color:'white' }}>
    Cryptocurrency Prices by Market Cap
    </Typography>
    
    <TextField variant='outlined' label='Search For a Crypto Currency..' onChange={(e)=> setsearch(e.target.value)} style={{ marginBottom: 20, width: "100%", }}></TextField>
    
    </Container>
    </ThemeProvider>
  )
}

export default CoinsTable