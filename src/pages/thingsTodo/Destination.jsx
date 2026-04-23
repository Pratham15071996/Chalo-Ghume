import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DestinationCard from './DestinationCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'

import {Grid,Box,Center} from '@chakra-ui/react';


export const Destination = () => {
  const [places,setPlaces] = useState([])
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
 
  let place = searchParams.get("place")
  
  
  useEffect(()=>{
    if (place) {
      axios.get(`${process.env.REACT_APP_THINGS_TODO_API_URL}/Things_todo?place=${place}`)
        .then((response) => {
          setPlaces(response.data)
          setError(null)
        })
        .catch((err) => {
          setError('Failed to load destinations')
        });
    }
  }, [place])
 
 
  return (

    
      <>
      
        <Center>
      
      <Grid templateColumns={{ base: 'repeat(1, 1fr)',  md: 'repeat(2, 1fr)',lg:'repeat(3, 1fr)'} } columnGap={20} rowGap={20} mt={"60px"}>
       {places.map((el)=>(<DestinationCard key={el.id} image={el.image} title={el.title} price={el.price} rating={+el.rating ? +el.rating : 0} place={el.place}/>
        ))}
        </Grid>
    
  </Center>
   
      
      
      </>
      
  )
}
