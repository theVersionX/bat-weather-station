import { Antenna } from "../../interfaces/antenna";
import { CloudType } from "../../interfaces/cloud-type";
import { DataPoint } from "../../interfaces/data-point";
import { WeatherData } from "../../interfaces/weather-data";

export class CloudAttenuation {
    constructor() { }

    calculateAttenuation(allWeatherData: WeatherData, antenna: Antenna,cloudType:CloudType): DataPoint[] {
        // console.log("calculating");
        let dataPoints: DataPoint[] = [];
        let frequency:number=antenna.antennaParams.frequency;
        for (let i = 0; i < allWeatherData.ids.length; i++) {
            let temperature=allWeatherData.temperatures[i]+273; //Temperature in Kelvin
            let cloudAttenuation: number = this.getCloudLiquidMassAbsorbtionCoefficient(frequency,temperature)*cloudType.liquidWaterDensity; //db/km
            dataPoints.push({ label: allWeatherData.timestamps[i], y: cloudAttenuation });
        }

        return dataPoints;
    }


    getCloudLiquidMassAbsorbtionCoefficient(freqency:number,temperature:number): number { //Kl
        let cloudLiquidMassAbsorbtionCoefficient: number = 0;
        let epsilon0:number=77.66+103.3*((300/temperature)-1);
        let epsilon1:number=0.0671*epsilon0;
        let epsilon2:number=3.52;
        let fp:number=20.2-146*(300/temperature-1)+316*Math.pow(300/temperature-1,2);
        let fs:number=39.8*fp;

        let epsilonImag:number=((freqency*(epsilon0-epsilon1))/(fp*(1+Math.pow(freqency/fp,2))))+((freqency*(epsilon1-epsilon2))/(fs*(1+Math.pow(freqency/fs,2))));
        let epsilonReal:number=((epsilon0-epsilon1)/(1+Math.pow(freqency/fp,2)))+((epsilon1-epsilon2)/(1+Math.pow(freqency/fs,2)))+epsilon2;
        let n:number= (2+epsilonReal)/(epsilonImag)
        cloudLiquidMassAbsorbtionCoefficient=(0.819*freqency)/(epsilonImag*(1+Math.pow(n,2)));

        return cloudLiquidMassAbsorbtionCoefficient;
    }
}