import React,{useContext,useEffect,useState} from 'react'
import './CoinInfo.css'
import { CryptoContextAPI } from '../../CryptoContext'
import { HistoricalChart } from '../../config/api'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { Line,LineChart,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer } from 'recharts'


const CoinInfo = ({coin}) => {
  const currency  = useContext(CryptoContextAPI)


  const [historicaldata, sethistoricaldata] = useState()
  const [days, setdays] = useState(1)
  
  // console.log(coin)

  const fetchHistoricalData = async()=>{
    const res = await axios.get(HistoricalChart(coin.id,days,currency.currency))
    // console.log('res',res)
    
    sethistoricaldata(res.data.prices)
  }
  // console.log(historicaldata)
  

  useEffect(()=>{
      fetchHistoricalData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
  },[days,currency.currency])
  return (
    <div className='containerInfo'>
      {/* chart */}

      {
        !historicaldata ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={3}/>
        ):(
            <div></div>
        )
      }
      

      {/* button  */}
      
    
    </div>
  )
}

export default CoinInfo