import React,{useState,useContext, useEffect} from 'react'
import axios from 'axios';
import { CoinList } from '../config/api';
import { CryptoContextAPI } from '../CryptoContext';
import './CoinsTable.css'
import { Container,Typography,TextField,createTheme,ThemeProvider, TableContainer,LinearProgress,TableBody, Table, TableHead, TableRow,TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const navigate = useNavigate();
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
      
        return coin.filter((eachCoin)=>{
            
            eachCoin.name.toLowerCase().includes(search) || eachCoin.symbol.toLowerCase().includes(search)
            
            // if(eachCoin.name.toLowerCase().includes(search) || eachCoin.symbol.toLowerCase().includes(search)){
            //     console.log(eachCoin)
                
            // }
        })
        
    }
    
  return (
    <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:'center'}}>
    <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat",color:'white' }}>
    Cryptocurrency Prices by Market Cap
    </Typography>
    
    <TextField variant='outlined' label='Search For a Crypto Currency..' onChange={(e)=> setsearch(e.target.value)} style={{ marginBottom: 20, width: "100%", }}></TextField>
    
    <TableContainer>
    
   
    {
      loading ? <LinearProgress style={{backgroundColor:'gold'}}></LinearProgress>:
      (
        <Table>
          <TableHead style={{backgroundColor:'#EEBC10'}}>
              <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                  key={head}
                  align={head === "Coin" ? "" : "right"}
                >
                  {head}
                </TableCell>
              ))}
              
              
              
              </TableRow>
          
              <TableBody>
              {
                
                coin.map((eachCoin)=>{
                  
                  const profit = eachCoin.price_change_percentage_24h > 0;
                  return(
                    <TableRow onClick={()=> navigate(`/coins/${eachCoin.id}`)} className='row'>
                      <TableCell component='th' scope='row' style={{display:'flex',gap:15}}>
                      
                        <img src={eachCoin.image} alt={eachCoin.name} height='50' style={{marginBottom:15}}></img>
                        <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22, color:'white'
                          }}
                        >
                          {eachCoin.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>
                              {eachCoin.name}
                            </span>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                      {currency.symbol}{" "}
                      {numberWithCommas(eachCoin.current_price.toFixed(2))}
                    </TableCell>
                    
                    <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {eachCoin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right" style={{color:'white'}}>
                          {currency.symbol}{" "}
                          {numberWithCommas(
                            eachCoin.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                    </TableRow>


                  )
                })
              }
              
              </TableBody>
          
          </TableHead>
        
        </Table>
      )
    }
    
    </TableContainer>


    </Container>
    </ThemeProvider>
  )
}

export default CoinsTable