import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
    console.log("cities?", cities)
    return (
        <div className="weather-button" >
            <Button variant={`${selectedCity === "" ? "success" : "outline-success"}`} onClick={() => handleCityChange("current")}>Current Location</Button>

            {cities.map((city) => (
                <Button variant={`${selectedCity === city ? "success" : "outline-success"}`} onClick={() => handleCityChange(city)}>{city}</Button>
            ))}
        </div>
    );
}

export default WeatherButton