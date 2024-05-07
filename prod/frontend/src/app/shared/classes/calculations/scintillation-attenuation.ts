import { Antenna } from "../../interfaces/antenna";
import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";


export class ScintillationAttenuation {

    constructor() {
    }

    public calculateAttenuation(weatherData: WeatherData, antenna: Antenna, p: number): DataPoint[] {
        let dataPoints: DataPoint[] = [];
        let freqency = antenna.antennaParams.frequency;
        let theta: number = antenna.antennaParams.elevation / 180 * Math.PI;
        let metersAboveSea = antenna.antennaParams.metersAboveSea;
        let antennaDiameter: number = antenna.antennaParams.diameter;
        let antennaEfficiency: number = antenna.antennaParams.efficiency;

        for (let i = 0; i < weatherData.ids.length; i++) {
            let temperature = weatherData.temperatures[i] + 273.15;
            let sigma = this.getSigma(antennaDiameter, antennaEfficiency, freqency, theta, metersAboveSea, temperature);
            let a = -0.061 * Math.pow(Math.log10(p), 3) + 0.072 * Math.pow(Math.log10(p), 2) - 1.71 * Math.log10(p) + 3; //prozentualer Zeitfaktor a(p)
            let A = a * sigma; //Fade-Tiefe A(p) die in p% der Zeit überschritten wird in dB.
            dataPoints.push({
                label: weatherData.timestamps[i],
                y: A
            })
        }

        return dataPoints;
    }

    getSigma(antennaDiameter: number, antennaEfficiency: number, freqency: number, theta: number, metersAboveSea: number, temperature: number): number {
        let sigma: number = 0;
        let sigmaRef: number = this.getSigmaRef(metersAboveSea, temperature);
        let g: number = this.getG(antennaDiameter, antennaEfficiency, freqency, theta);
        sigma = sigmaRef * Math.pow(freqency, 7 / 12) * (g / Math.pow(Math.sin(theta), 1.2))
        return sigma;
    }

    getSigmaRef(metersAboveSea: number, temperature: number): number {
        let sigmaRef: number = 0;
        let e: number = this.getVapourPressure(metersAboveSea, temperature);
        let NWet: number = 72 * e / temperature + 3.75 * Math.pow(10, 5) * (e / Math.pow(temperature, 2)); //ITU-R P.453-14
        sigmaRef = 3.6 * Math.pow(10, -3) + Math.pow(10, -4) * NWet; //ITU-R P.618-13
        return sigmaRef;
    }

    getG(antennaDiameter: number, antennaEfficiency: number, freqency: number, theta: number): number {
        let g: number = 0; //g(x)
        let Deff: number = Math.sqrt(antennaEfficiency) * antennaDiameter;
        let x: number = 1.22 * Math.pow(Deff, 2) * (freqency / this.getPathLenght(theta));
        g = Math.sqrt(3.86 * Math.pow(Math.pow(x, 2) + 1, 11 / 12) * Math.sin(11 / 6 * Math.atan(1 / x))-7.08*Math.pow(x,5/6));
        return g;
    }
    getPathLenght(theta: number): number {
        let pathLength: number = 0;
        let hL: number = 1000;//height of the turbulent layer =1000m
        pathLength = (2 * hL) / (Math.sqrt(Math.pow(Math.sin(theta), 2) + 2.35 * Math.pow(10, -4)) + Math.sin(theta));
        return pathLength;
    }

    getVapourPressure(metersAboveSea: number, temperature: number): number {
        let waterVapourDensity: number = 7.5 * Math.exp(metersAboveSea / 2000); //roh from IRU-R 835
        return (waterVapourDensity * temperature) / 216.7; //=e
    }


}