import { Antenna } from "../../interfaces/antenna";
import { Coord } from "../../interfaces/coord";
import { DataPoint } from "../../interfaces/data-point";
import { Satellite } from "../../interfaces/satellite";
import { WeatherData } from "../../interfaces/weather-data";

export class PrecipitationAttenuation {

    constructor() {
    }

    public calculateAttenuation( weatherData: WeatherData,antennaSettings:Antenna,satelliteSettings:Satellite ): DataPoint[] {
        // console.log("calculating");
        let dataPoints: DataPoint[] = [];
        for (let i = 0; i < weatherData.ids.length; i++) {
           
        }
        return dataPoints;
    }

    getR001(weatherData:WeatherData):number{
        return 70.4; //in mm/hr
    }


}