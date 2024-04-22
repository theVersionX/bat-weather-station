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

    getNImagOxygen(freqency: number): number {
        let nImagOxygen: number = 0;

        return nImagOxygen;
    }

    getNImagWaterVapour(freqency: number): number {
        let nImagWaterVapour: number = 0;

        return nImagWaterVapour;
    }

    override calculateAttenuation(freqency: number, allWeatherData: WeatherData): DataPoint[] {
        // console.log("calculating");
        this.gamma = 0.182 * freqency * (this.getNImagOxygen(freqency));

        console.log(
            SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b1.length,
            SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b2.length,
            SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b3.length,
            SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b4.length,
            SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b5.length,
            SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b6.length,
        );
        console.log(
            SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a1.length,
            SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a2.length,
            SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a3.length,
            SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a4.length,
            SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a5.length,
            SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a6.length,
        );

        return [];
    }
}