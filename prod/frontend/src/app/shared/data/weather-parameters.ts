import { WeatherParameter } from "../interfaces/weather-parameter"

export const WEATHER_PARAMETERS = {
    pressure: {
        title:"Druck (mb)",
        arrayName:"pressures"
    },
    temperature:{
        title: "Temperatur (°C)",
        arrayName:"temperatures"
    },
    windSpeed: {
        title:"Windgeschwindigkeit (m/s)",
        arrayName:"windSpeeds"
    },
    humidity:  {
        title:"Luftfeuchtigkeit (%)",
        arrayName:"humidities"
    },
    precipitation:  {
        title:"Niederschlag (mm)",
        arrayName:"precipitations"
    },
}

export const WEATHER_PARAMETERS_AS_ARRAY:WeatherParameter[]=[
    WEATHER_PARAMETERS.pressure,
    WEATHER_PARAMETERS.temperature,
    WEATHER_PARAMETERS.windSpeed,
    WEATHER_PARAMETERS.humidity,
    WEATHER_PARAMETERS.precipitation
]