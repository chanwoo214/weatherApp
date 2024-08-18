import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
         <Button variant="success">Current Location</Button>
         <Button variant="success">Seoul</Button>
         <Button variant="success">Wellington</Button>
    </div>
  )
}

export default WeatherButton