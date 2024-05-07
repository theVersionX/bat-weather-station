import { Antenna } from "../../interfaces/antenna";
import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";


export class ExtraTerrestrialNoiseTemperatureAttenuation {
    constructor() { }

    calculateAttenuation(allWeatherData: WeatherData, antenna: Antenna): DataPoint[] {
        // console.log("calculating");
        let dataPoints: DataPoint[] = [];
        for (let i = 0; i < allWeatherData.ids.length; i++) {

            

            let extraTerrestrialNoiseTemperatureAttenuation: number = 0;
            dataPoints.push({
                label: allWeatherData.timestamps[i],
                y: extraTerrestrialNoiseTemperatureAttenuation
            });

        }
        return dataPoints;
    }



}