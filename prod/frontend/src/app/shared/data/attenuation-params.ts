import { GaseousAttenuation } from "../classes/calculations/gaseous-attenuation";
import { AttenuationParam } from "../interfaces/attenuation-param";



export const ATTENUATION_PARAMS={
    gaseousAttenuation:{
        title:"Abschwächung durch Gase",
        id:"gaseous-attenuation",
        getData:new GaseousAttenuation().calculateAttenuation,
    },
    precipitationAttenuation:{
        title:"Abschwächung durch Niederschlag",
        id:"precipitation-attenuation",
        getData:new GaseousAttenuation().calculateAttenuation,
    },
    cloudAttenuation:{
        title:"Abschwächung durch Wolken",
        id:"cloud-attenuation",
        getData:new GaseousAttenuation().calculateAttenuation,
    },
    scintillationAttenuation:{
        title:"Abschwächung durch Szintillation",
        id:"scintillation-attenuation",
        getData:new GaseousAttenuation().calculateAttenuation,
    },
    skyNoiseAttenuation:{
        title:"Abschwächung durch Rauschen (Himmel)",
        id:"sky-noise-attenuation",
        getData:new GaseousAttenuation().calculateAttenuation,
    },
    cosmicNoiseAttenuation:{
        title:"Abschwächung durch Rauschen (Kosmisch)",
        id:"cosmic-noise-attenuation",
        getData:new GaseousAttenuation().calculateAttenuation,
    },
}

export const ATENUATION_PARAMS_AS_ARRAY:AttenuationParam[]=[
   ATTENUATION_PARAMS.gaseousAttenuation,
   ATTENUATION_PARAMS.precipitationAttenuation,
   ATTENUATION_PARAMS.cloudAttenuation,
   ATTENUATION_PARAMS.scintillationAttenuation,
   ATTENUATION_PARAMS.skyNoiseAttenuation,
   ATTENUATION_PARAMS.cosmicNoiseAttenuation,
]