import React,{useState,useContext,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContextAPI } from '../../CryptoContext'
import './CoinPage.css'
import { SingleCoin } from '../../config/api'
import axios from 'axios'
import { LinearProgress,Typography } from '@mui/material'
import CoinInfo from '../CoinInfo/CoinInfo'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinPage = () => {
    const currency = useContext(CryptoContextAPI)
    const {id} = useParams()
    const [coin, setcoin] = useState('')
    
    const fetchCoin = async()=>{
        const res = await axios.get(SingleCoin(id))
        setcoin(res.data)
    }
    
    useEffect(()=>{
        fetchCoin()
    },[])
    // console.log(id,currency,coin)

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div style={{display:'flex'}}>
        <div className='sidebar'>
            {/* */}
            <img src={coin.image.large} style={{marginBottom:20}} alt={coin.name}></img>

            <Typography variant="h3" className='heading'> {coin.name}</Typography>
            <Typography variant="subtitle1" className='description'>
          {(coin.description.en.split(". ")[0])}.
        </Typography>


        <div className='marketData'>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className='heading' style={{color:'white'}}>
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",color:'gold'
            }}
          >
            {numberWithCommas(coin.market_cap_rank)}
          </Typography>
        </span>


        <span style={{ display: "flex" }}>
        <Typography variant="h5" className='heading'>
          Current Price:
        </Typography>
        &nbsp; &nbsp;
        <Typography
          variant="h5"
          style={{
            fontFamily: "Montserrat",color:'gold'
          }}
        >
          {currency.symbol}{" "}
          {numberWithCommas(
            coin.market_data.current_price[currency.currency.toLowerCase()]
          )}
        </Typography>
      </span>

      <span style={{ display: "flex" }}>
      <Typography variant="h5" className='heading'>
        Market Cap:
      </Typography>
      &nbsp; &nbsp;
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",color:'gold'
        }}
      >
        {currency.symbol}{" "}
        {numberWithCommas(
          coin?.market_data.market_cap[currency.currency.toLowerCase()]
            .toString()
            .slice(0, -6)
        )}
        M
      </Typography>
    </span>
        </div>

        </div>
        {/* Chart */}
        <CoinInfo coin={coin}></CoinInfo>
    </div>
  )
}

export default CoinPage