import { Antenna } from "../../interfaces/antenna";
import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";


export class SkyNoiseTemperatureAttenuation {
    constructor() { }

    calculateAttenuation(allWeatherData: WeatherData, antenna: Antenna): DataPoint[] {
        // console.log("calculating");
        let dataPoints: DataPoint[] = [];
        for (let i = 0; i < allWeatherData.ids.length; i++) {
            let precipitation = allWeatherData.precipitations[i];
            let temperature = allWeatherData.temperatures[i] + 273.15;

            let skyNoiseTemperatureAttenuation = 0;
            if (precipitation > 1) { //if it rains
                let rainTemperature: number = temperature;
                let A: number = this.getA(); //Attenuation exceeded for 0.01% of time in dB
                let skyNoiseTemperature: number = rainTemperature * (1 - Math.pow(10, -1 * A / 10)); //Ts
                let F=this.getF();
                let receiverSystemNoiseTemperature: number = this.getReceiverSystemNoiseTemperature(F);//Tr
                skyNoiseTemperatureAttenuation = 10 * Math.log10((skyNoiseTemperature + receiverSystemNoiseTemperature) / (receiverSystemNoiseTemperature));
            }
            dataPoints.push({
                label: allWeatherData.timestamps[i],
                y: skyNoiseTemperatureAttenuation
            });
        }
        return dataPoints;
    }
    getF():number{
        let F:number=0;
        let signalIn:number=0;
        let noiseIn:number=0;
        let signalOut:number=0;
        let noiseOut:number=0;
        let SNRin:number=signalIn/noiseIn;
        let SNRout:number=signalOut/noiseOut;
        F=SNRin/SNRout; //referenztabelle, siehe NRT sw07 p2
        return F;
    }

    getA(): number {
        //todo. Summe aller berechneten Dämpfungen und dann der wert, der für 0.01% der zeit überschritten wird? ITU-HANDBOOK P. 47
       
        let attenuations: number[] = [];
        //todo sum up all attenuations?

        let attenuations_sorted: number[] = attenuations.sort((a, b) => b - a);
        let index001 = Math.floor(0.0001 * attenuations.length);
        let A = attenuations_sorted[index001]; //referenztabelle suchen
        
        return A;
    }

    getReceiverSystemNoiseTemperature(F:number): number {
        let receiverSystemNoiseTemperature: number = 0;
        receiverSystemNoiseTemperature=290*(F-1);
        return receiverSystemNoiseTemperature;
    }
}