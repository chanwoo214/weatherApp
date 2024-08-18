import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
    console.log("cities?", cities)
    return (
        <div className="weather-button">
            <Button variant="success">Current Location</Button>

            {cities.map((item, index) => (
                <Button variant="success" key={index} onClick={() => setCity(item)}>{item}</Button>
            ))}
        </div>
    )
}

export default WeatherButton