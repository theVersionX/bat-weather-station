import { DataPoint } from "../interfaces/data-point";

export abstract class Calculation{

    abstract calculateAttenuation():DataPoint[];
}