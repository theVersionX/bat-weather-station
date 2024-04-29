import { Antenna } from "../../interfaces/antenna";
import { Coord } from "../../interfaces/coord";
import { DataPoint } from "../../interfaces/data-point";
import { Satellite } from "../../interfaces/satellite";
import { WeatherData } from "../../interfaces/weather-data";
import { A_H } from "./tables/coefficients/a-h";
import { A_V } from "./tables/coefficients/a-v";
import { K_H } from "./tables/coefficients/k-h";
import { K_V } from "./tables/coefficients/k-v";

export class PrecipitationAttenuation {

    constructor() {
    }

    public calculateAttenuation(weatherData: WeatherData, antenna: Antenna, satellite: Satellite): DataPoint[] {
        // console.log("calculating");
        let dataPoints: DataPoint[] = [];

        //antenna
        let antennaLat: number = antenna.coord.lat;
        let antennaLong: number = antenna.coord.long;
        let heightAboveSea: number = antenna.antennaParams.metersAboveSea;
        let frequency: number = antenna.antennaParams.frequency;
        let isVerticalPolarized: boolean = antenna.antennaParams.polarisationAngle == 90;
        let theta: number = antenna.antennaParams.elevation / 180 * Math.PI;

        //satellite
        let satelliteLong: number = satellite.coord.long;

        //for A001 (currently not used)
        let effectiveRainHeight: number = 3 + 0.028 * antennaLat; //hr
        let slantPathLength: number = (effectiveRainHeight - heightAboveSea) / Math.sin(theta) //Ls
        let horizontalProjectionOfSlantPath: number = slantPathLength * Math.cos(theta); // LG
        let R001: number = this.getR001(weatherData.precipitations); //R001=Rain intensity exceeded for 0.01% of an average year
        let L0: number = 35 * Math.exp(-0.015 * R001);
        let reductionFactor001: number = 1 / (1 + (horizontalProjectionOfSlantPath / L0))//r001

        //for specific attenuation
        let k: number = this.getK(isVerticalPolarized, frequency);
        let alpha: number = this.getA(isVerticalPolarized, frequency);
        let specificAttenuation = k * Math.pow(R001, alpha); //gamma in db/km

        return dataPoints;
    }

    getK(isVertical: boolean, freqency: number): number {
        let logK = 0;
        let k = isVertical ? K_V : K_H;
        for (let i = 0; i < k.j.length; i++) {
            logK += (k.aj[i] * Math.exp(-(Math.pow(((Math.log10(freqency) - k.bj[i]) / k.cj[i]), 2))));
        }
        logK += k.mk * Math.log10(freqency) + k.ck;
        return Math.pow(10, logK);
    }

    getA(isVertical: boolean, freqency: number): number {
        let alpha = 0;
        let a = isVertical ? A_V : A_H;
        for (let i = 0; i < a.j.length; i++) {
            alpha += (a.aj[i] * Math.exp(-(Math.pow(((Math.log10(freqency)- a.bj[i]) / a.cj[i]), 2))));
        }
        alpha += a.ma * Math.log10(freqency) + a.ca
        return alpha
    }


    getR001(precipitations: number[]): number {
        //todo        
        let precipitation_sorted: number[] = precipitations.sort((a, b) => b - a);
        let index001 = Math.floor(0.0001 * precipitations.length);
        let R001 = precipitation_sorted[index001];
        return 70.4; //in mm/hr
    }


}