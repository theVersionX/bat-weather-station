export interface WeatherData {
    ids: number[],
    timestamps: string[],
    pressures: number[],
    temperatures: number[],
    windSpeeds: number[],
    humidities: number[],
    precipitations: number,
}