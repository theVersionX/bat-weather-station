import { AntennaParams } from "./antenna-params";
import { Coord } from "./coord";

export interface Antenna{
    name:string,
    coord: Coord,
    antennaParams:AntennaParams,
}