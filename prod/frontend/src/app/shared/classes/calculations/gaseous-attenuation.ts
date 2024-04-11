import { DataService } from "../../../services/data.service";
import { Calculation } from "../../base-classes/calculation";
import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";

export class GaseousAttenuation extends Calculation {
    constructor(){
        super();
    }

    override calculateAttenuation(allWeatherData:WeatherData):DataPoint[]{
       // console.log("calculating");
        return [];
    }
}