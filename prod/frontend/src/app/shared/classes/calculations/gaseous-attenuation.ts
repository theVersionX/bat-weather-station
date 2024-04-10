import { Calculation } from "../../base-classes/calculation";
import { DataPoint } from "../../interfaces/data-point";

export class GaseousAttenuation extends Calculation {
    constructor(){
        super();
    }

    override calculateAttenuation():DataPoint[]{
       // console.log("calculating");
        return [];
    }
}