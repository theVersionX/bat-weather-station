import { GaseousAttenuation } from "../classes/calculations/gaseous-attenuation";
import { AttenuationParam } from "../interfaces/attenuation-param";
import { WeatherData } from "../interfaces/weather-data";



export const ATTENUATION_PARAMS={
    gaseousAttenuation:{
        title:"Abschwächung durch Gase (db/km)",
        id:"gaseous-attenuation",
        getData: (freqency:number,allWeatherData:WeatherData)=>{return new GaseousAttenuation().calculateAttenuation(freqency,allWeatherData)},
    },
    precipitationAttenuation:{
        title:"Abschwächung durch Niederschlag",
        id:"precipitation-attenuation",
        getData:()=>{},
    },
    cloudAttenuation:{
        title:"Abschwächung durch Wolken",
        id:"cloud-attenuation",
        getData:()=>{},
    },
    scintillationAttenuation:{
        title:"Abschwächung durch Szintillation",
        id:"scintillation-attenuation",
        getData:()=>{},
    },
    skyNoiseAttenuation:{
        title:"Abschwächung durch Rauschen (Himmel)",
        id:"sky-noise-attenuation",
        getData:()=>{},
    },
    cosmicNoiseAttenuation:{
        title:"Abschwächung durch Rauschen (Kosmisch)",
        id:"cosmic-noise-attenuation",
        getData:()=>{},
    },
}

export const ATENUATION_PARAMS_AS_ARRAY:AttenuationParam[]=[
   ATTENUATION_PARAMS.gaseousAttenuation,
  // ATTENUATION_PARAMS.precipitationAttenuation,
  // ATTENUATION_PARAMS.cloudAttenuation,
   //ATTENUATION_PARAMS.scintillationAttenuation,
   //ATTENUATION_PARAMS.skyNoiseAttenuation,
   //ATTENUATION_PARAMS.cosmicNoiseAttenuation,
]