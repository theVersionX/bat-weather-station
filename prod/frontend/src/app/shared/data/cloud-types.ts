import { CloudType } from "../interfaces/cloud-type"

const cirrus:string="Zirrus";
const fog:string="Nebel";
const stratus:string="Stratus";
const cumulus:string="Kumulus";
const stratocumulus:string="Stratokumulus";
const cumulonimubs:string="Kumulonimubs";

export const CLOUD_TYPES = {
    cirrus: {
        name: cirrus,
        liquidWaterDensity: 0.03,
    },
    fog: {
        name: fog,
        liquidWaterDensity: 0.05,
    },
    stratus: {
        name: stratus,
        liquidWaterDensity: 0.275, //0.25-0.3
    },
    cumulus: {
        name: cumulus,
        liquidWaterDensity: 0.275, //0.25-0.3
    },
    stratocumulus: {
        name: stratocumulus,
        liquidWaterDensity: 0.45,
    },
    cumulonimubs: {
        name:cumulonimubs,
        liquidWaterDensity: 2, //1-3
    },
}


export const CLOUD_NAMES_AS_ARRAY:string[]=[
    cirrus,
    fog,
    stratus,
    cumulus,
    stratocumulus,
    cumulonimubs,
]

export const CLOUD_TYPES_AS_ARRAY:CloudType[]=[
    CLOUD_TYPES.cirrus,
    CLOUD_TYPES.fog,
    CLOUD_TYPES.stratus,
    CLOUD_TYPES.cumulus,
    CLOUD_TYPES.stratocumulus,
    CLOUD_TYPES.cumulonimubs
]