import React,{useState,useContext, useEffect} from 'react'
import './Carousel.css'
import { TrendingCoins } from '../../config/api'
import axios from 'axios'
import { CryptoContextAPI } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const navigate = useNavigate()
    const [trending, settrending] = useState()
    const currency_C_APi = useContext(CryptoContextAPI)
    // console.log(currency_C_APi.currency)

    const fetchTrendingCoins = async()=>{
        const res = await axios.get(TrendingCoins(currency_C_APi.currency))
        // console.log(res.data)
        settrending(res.data)
    }
    useEffect(()=>{
     fetchTrendingCoins()
    
    
    },[currency_C_APi.currency])
    if(!trending){
        return <div></div>
    }
    const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 4,
      },
    };
    
    const itemCoin = trending.map((coin)=>{
      let profit = coin.price_change_percentage_24h >=0;
      return <div>
        <img src={coin.image} alt={coin.name} height='80' onClick={()=>{navigate('/')}} style={{marginBottom:10,marginTop:30}}></img>
        <div>
        <span className='textCarousel'>{coin.symbol}&nbsp;
        <span className='textCarousel' style={{
          color: profit > 0 ? "rgb(14, 203, 129)" : "red",fontWeight: 500,}}>
          {profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}
          </span></span>
          </div>
          <div>
          <span className='currencyPrice' style={{fontSize:22,fontWeight:500}}>
          { currency_C_APi.symbol } {numberWithCommas(coin.current_price.toFixed(2))}
          </span>
          </div>
      </div>
    })
    
  return (
    <div>
    
    <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500}
    disableDotsControls disableButtonsControls responsive={responsive} autoPlay items={itemCoin}></AliceCarousel>
    
    </div>
  )
}

export default Carousel