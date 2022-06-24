import React from 'react'
import './Banner.css'
import BannerImg from '../../images/banner2.jpg'
import { Typography,Container } from '@mui/material'
import Carousel from './Carousel'
const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContent'>
        <div className='bannerTagLine'>
        <Typography variant='h2' style={{fontWeight:'bold',marginBottom:15,fontFamily:'monospace',color:'white'}}>Crypto Hunter</Typography>
        
        
        <Typography variant="subtitle2" style={{ color: "darkgrey", textTransform: "capitalize",fontFamily: "Montserrat", }}>
        Get all the Info regarding your favorite Crypto Currency
        </Typography>
        </div>
          <Carousel></Carousel> 
        </Container>
    
    </div>
  )
}

export default Banner