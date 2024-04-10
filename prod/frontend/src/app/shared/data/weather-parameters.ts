import { Title } from "@angular/platform-browser"

export const WEATHER_PARAMETERS = {
    pressure: {
        title:"Druck",
        arrayName:"pressures"
    },
    temperature:{
        title: "Temperatur",
        arrayName:"temperatures"
    },
    windSpeed: {
        title:"Windgeschwindigkeit",
        arrayName:"windSpeeds"
    },
    humidity:  {
        title:"Luftfeuchtigkeit",
        arrayName:"humidities"
    },
    precipitation:  {
        title:"Niederschlag",
        arrayName:"precipitations"
    },
}

export interface WEATHER_PARAMETER{
title:string,
arrayName:string
}

export const WEATHER_PARAMETERS_AS_ARRAY:WEATHER_PARAMETER[]=[
    WEATHER_PARAMETERS.pressure,
    WEATHER_PARAMETERS.temperature,
    WEATHER_PARAMETERS.windSpeed,
    WEATHER_PARAMETERS.humidity,
    WEATHER_PARAMETERS.precipitation
]