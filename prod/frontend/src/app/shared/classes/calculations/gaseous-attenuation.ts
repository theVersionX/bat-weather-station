import { Calculation } from "../../base-classes/calculation";
import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";
import { SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION } from "./tables/spectroscopic-data-for-oxygen-attenuation";
import { SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION } from "./tables/spectroscopic-data-for-water-vapour-attenuation";

export class GaseousAttenuation extends Calculation {

    gamma: number = 0;


    constructor() {
        super();
    }

    override calculateAttenuation(freqency: number, allWeatherData: WeatherData): DataPoint[] {
        // console.log("calculating");
        let attenuations: number[] = [];
        for (let i = 0; i < allWeatherData.ids.length; i++) {
            let temperature = allWeatherData.temperatures[i];
            let pressure = allWeatherData.pressures[i];
            this.gamma = 0.182 * freqency * (this.getNImagOxygen(freqency, temperature,pressure) + this.getNImagWaterVapour(freqency, temperature));
            attenuations[i] = this.gamma;
        }
        return [];
    }

    getNImagOxygen(freqency: number, temperature: number,pressure:number): number {
        let nImagOxygen: number = 0;
        let theta = 300 / temperature
        for (let i = 0; i < SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a1.length; i++) {
            let Si = SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a1[i] * Math.pow(10, -7)*pressure * Math.pow(theta, 3) * Math.exp(SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a2[i]*(1-theta));
            let Fi = 0;
            let NDImag = 0;
            nImagOxygen += Si * Fi + NDImag;
        }

        return nImagOxygen;
    }

    getNImagWaterVapour(freqency: number, temperature: number): number {
        let nImagWaterVapour: number = 0;

        return nImagWaterVapour;
    }

}