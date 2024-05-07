import { GaseousAttenuation } from "../classes/calculations/gaseous-attenuation";
import { PrecipitationAttenuation } from "../classes/calculations/precipitation-attenuation";
import { AttenuationParam } from "../interfaces/attenuation-param";
import { WeatherData } from "../interfaces/weather-data";



export const ATTENUATION_PARAMS={
    gaseousAttenuation:{
        title:"Abschwächung durch Gase [dB/km]",
        id:"gaseous-attenuation",
    },
    precipitationAttenuation:{
        title:"Abschwächung durch Niederschlag [dB/km]",
        id:"precipitation-attenuation",
    },
    cloudAttenuation:{
        title:"Abschwächung durch Wolken [dB/km]",
        id:"cloud-attenuation",
    },
    scintillationAttenuation:{
        title:"Abschwächung durch Szintillation [dB]",
        id:"scintillation-attenuation",
    },
    skyNoiseAttenuation:{
        title:"Abschwächung durch Rauschen (Himmel)",
        id:"sky-noise-attenuation",
    },
    cosmicNoiseAttenuation:{
        title:"Abschwächung durch Rauschen (Kosmisch)",
        id:"cosmic-noise-attenuation",
    },
}

export const ATENUATION_PARAMS_AS_ARRAY:AttenuationParam[]=[
   ATTENUATION_PARAMS.gaseousAttenuation,
   ATTENUATION_PARAMS.precipitationAttenuation,
   ATTENUATION_PARAMS.cloudAttenuation,
   ATTENUATION_PARAMS.scintillationAttenuation,
   //ATTENUATION_PARAMS.skyNoiseAttenuation,
   //ATTENUATION_PARAMS.cosmicNoiseAttenuation,
]