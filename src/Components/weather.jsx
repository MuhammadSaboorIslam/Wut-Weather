import React,{useState} from 'react'
import "./weather.css" 
import searchIcon from "./Assets/search.png"
import clear from "./Assets/clear.png"
import cloud from "./Assets/cloud.png"
import drizzle from "./Assets/drizzle.png"
import Humidity from "./Assets/humidity.png"
import rain from "./Assets/rain.png"
import snow from "./Assets/snow.png"
import Wind from "./Assets/wind.png"
import Button from './UnitButton'
import More from "./Assets/more1.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Weather() {
    let apiKey = "0103960a6b8d6a1f8225dacd3f914659";
    const [temp,setTemp] = useState("00")
    const [humid , setHumid] = useState("00")
    const [wind , setwind] = useState("0")
    const [location , setlocation] = useState("World")
    const [wicon , setIcon] = useState(clear)
    const [units , setUnits] = useState("C")
    const [country , setCountry] = useState("PK")
    const [style , setStyle] = useState(false)

    const toggleStyles = () => {
        setStyle(!style);
        if (style === false ){
            document.documentElement.style.height = "1100px"
        }else{
            document.documentElement.style.height = "800px"
        }
      };

    const search = async() => {
        const q = document.getElementsByClassName("cityinput");
        if (q[0].value === ""){
            toast("Search Field can't be empty")
            return 0;
        } else {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${q[0].value}&units=Metric&appid=${apiKey}`
            let response = await fetch(url);
            let data = await response.json();
            if(data.main){
                setHumid(data.main.humidity);
            }else{
                toast("Enter a valid location");
                return 0;
            }
            setwind(data.wind.speed)
            setTemp(data.main.temp)
            setlocation(data.name)
            setCountry(data.sys.country)
            if (data.weather.icon === "01d" || data.weather.icon === "01n"){
                setIcon(clear)
            }else if (data.weather.icon === "02d" || data.weather.icon === "02n"){
                setIcon(cloud)
            }
            else if (data.weather.icon === "03d" || data.weather.icon === "03n"){
                setIcon(drizzle)
            }else if (data.weather.icon === "04d" || data.weather.icon === "04n"){
                setIcon(cloud)
            }else if (data.weather.icon === "09d" || data.weather.icon === "09n"){
                setIcon(rain)
            }else if (data.weather.icon === "10d" || data.weather.icon === "10n"){
                setIcon(rain)
            }else if (data.weather.icon === "13d" || data.weather.icon === "13n"){
                setIcon(snow)
            }else {
                setIcon(clear)
            }
        }
    }

  return (
    <>
     <div className={style?"container-updated":"container"}>
        <div className="top-bar">
            <input type="text" className="cityinput" placeholder='Search'/>
            <ToastContainer />
            <div className="searchIcon" onClick={search}>
                <img src={searchIcon} alt="search" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="clear" />
        </div>
        <div className="temperature">{units==="C" ? Math.floor(temp) : ((temp*9/5)+32).toFixed(1)}°{units==="F"? "F" : "C"}</div>
        <div className="location">{location} <sup className="superscript-char">{country}</sup></div>
        <div className="dataContainer">
            <div className="element">
                <img src={Humidity} alt="humid" className='icon'/>
                <div className="data">
                    <div className="humidity-per humidity ">{humid}%</div>
                    <div className="data-text humidity">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={Wind} alt="wind" className='icon'/>
                <div className="data">
                    <div className="wind-rate wind humidity-per humidity">{units=== "C" ? wind : (wind*0.27778).toFixed(2)} {units === "C"? "km/h":"m/s"}</div>
                    <div className="data-text wind">Wind speed </div>
                </div>
            </div>
        </div>
        
     </div>
     <img src={More} alt="More" className='more' onClick={toggleStyles}/>
     <Button setUnit = {setUnits} />
     </>
  )
}

export default Weather
