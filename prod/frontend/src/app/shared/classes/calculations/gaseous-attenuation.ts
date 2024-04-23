import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";
import { SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION } from "./tables/spectroscopic-data-for-oxygen-attenuation";
import { SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION } from "./tables/spectroscopic-data-for-water-vapour-attenuation";

export class GaseousAttenuation {

    constructor() {
    }

    calculateAttenuation(freqency: number, allWeatherData: WeatherData): DataPoint[] {
        // console.log("calculating");
        let dataPoints: DataPoint[] = [];
        for (let i = 0; i < allWeatherData.ids.length; i++) {
            let temperature = allWeatherData.temperatures[i] + 273.15;
            let pressure = allWeatherData.pressures[i];

            //attenuation in db/km
            let gamma: number = 0.182 * freqency * (this.getNImagOxygen(freqency, temperature, pressure) + this.getNImagWaterVapour(freqency, temperature, pressure));
            dataPoints.push({ label: allWeatherData.timestamps[i], y: gamma });
        }
        return dataPoints;
    }

    getNImagOxygen(freqency: number, temperature: number, pressure: number): number {
        let nImagOxygen: number = 0;
        let theta = 300 / temperature
        for (let i = 0; i < SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a1.length; i++) {
            //calculation of Si
            let Si: number = SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a1[i] * Math.pow(10, -7) * pressure * Math.pow(theta, 3) * Math.exp(SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a2[i] * (1 - theta));

            let partialPressure: number = this.getPartialPressure(pressure, temperature) //=e

            //calculation of Fi
            let deltaF: number = SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a3[i] * Math.pow(10, -4) * (pressure * Math.pow(theta, 0.8 - SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a4[i]) + 1.1 * partialPressure * theta);
            let modifiedDeltaF: number = Math.sqrt(Math.pow(deltaF, 2) + 2.25 * Math.pow(10, -6));
            let interferenceCorrectionDelta: number = (SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a5[i] + SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.a6[i] * theta) * Math.pow(10, -4) * (pressure + partialPressure) * Math.pow(theta, 0.8); //d (delta)
            let fi: number = SPECTROSCOPIC_DATA_FOR_OXYGEN_ATTENUATION.f0[i];
            let Fi: number = this.getFi(freqency, fi, modifiedDeltaF, interferenceCorrectionDelta)//(freqency / fi) * (((modifiedDeltaF - interferenceCorrectionDelta * (fi - freqency)) / (Math.pow(fi - freqency, 2) + Math.pow(modifiedDeltaF, 2))) + ((modifiedDeltaF - interferenceCorrectionDelta * (fi + freqency)) / (Math.pow(fi + freqency, 2) + Math.pow(modifiedDeltaF, 2))));

            //calculation of NDImag
            let widthParamOfDebyeSpectrum: number = 5.6 * Math.pow(10, -4) * (pressure + partialPressure) * Math.pow(theta, 0.8); //d
            let NDImag = freqency * pressure * Math.pow(theta, 2) * (((6.14 * Math.pow(10, -5)) / (widthParamOfDebyeSpectrum * (1 + Math.pow(freqency / widthParamOfDebyeSpectrum, 2)))) + ((1.4 * Math.pow(10, -12) * pressure * Math.pow(theta, 1.5)) / (1 + 1.9 * Math.pow(10, -5) * Math.pow(freqency, 1.5)))); //Nd''

            nImagOxygen += Si * Fi + NDImag;
        }

        return nImagOxygen;
    }

    getNImagWaterVapour(freqency: number, temperature: number, pressure: number): number {
        let nImagWaterVapour: number = 0;
        let theta = 300 / temperature
        for (let i = 0; i < SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b1.length; i++) {

            let partialPressure: number = this.getPartialPressure(pressure, temperature) //=e
            //calculation of Si
            let Si: number = SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b1[i] * Math.pow(10, -1) * partialPressure * Math.pow(theta, 3.5) * Math.exp(SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b2[i] * (1 - theta));

            //calculation of Fi
            let deltaF: number = SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b3[i] * Math.pow(10, -4) * (pressure * Math.pow(theta, SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b4[i]) + SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b5[i] * partialPressure * Math.pow(theta, SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.b6[i]));
            let fi: number = SPECTROSCOPIC_DATA_FOR_WATER_VAPOUR_ATTENUATION.f0[i];
            let modifiedDeltaF: number = 0.535 * deltaF + Math.sqrt(0.217 * Math.pow(deltaF, 2) + ((2.1316 * Math.pow(10, -12) * Math.pow(fi, 2)) / theta));
            let interferenceCorrectionDelta: number = 0; //d (delta)
            let Fi: number = this.getFi(freqency, fi, modifiedDeltaF, interferenceCorrectionDelta)//(freqency / fi) * (((modifiedDeltaF - interferenceCorrectionDelta * (fi - freqency)) / (Math.pow(fi - freqency, 2) + Math.pow(modifiedDeltaF, 2))) + ((modifiedDeltaF - interferenceCorrectionDelta * (fi + freqency)) / (Math.pow(fi + freqency, 2) + Math.pow(modifiedDeltaF, 2))));

            nImagWaterVapour += Si * Fi;
        }
        return nImagWaterVapour;
    }

    getFi(freqency: number, fi: number, modifiedDeltaF: number, interferenceCorrectionDelta: number): number {
        return (freqency / fi) * (((modifiedDeltaF - interferenceCorrectionDelta * (fi - freqency)) / (Math.pow(fi - freqency, 2) + Math.pow(modifiedDeltaF, 2))) + ((modifiedDeltaF - interferenceCorrectionDelta * (fi + freqency)) / (Math.pow(fi + freqency, 2) + Math.pow(modifiedDeltaF, 2))));

    }

    getPartialPressure(pressure: number, temperature: number): number {
        return (pressure * temperature) / 216.7; //=e
    }

}