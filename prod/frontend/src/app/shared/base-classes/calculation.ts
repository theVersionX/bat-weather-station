import { DataPoint } from "../interfaces/data-point";
import { WeatherData } from "../interfaces/weather-data";

export abstract class Calculation{

    abstract calculateAttenuation(frequency:number, allWeatherData:WeatherData):DataPoint[];
}