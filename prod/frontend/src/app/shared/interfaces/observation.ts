export interface Observation {
    country: string;
    epoch: number;
    humidity: number;
    lat: number;
    lon: number;
    metric: {
        temp: number;
        heatIndex: number;
        dewpt: number;
        windChill: number;
        windSpeed: number;
        pressure:number
        precipTotal:number,
        // Add more properties as needed
    };
    neighborhood: string;
    obsTimeLocal: string;
    obsTimeUtc: string;
    qcStatus: number;
    realtimeFrequency: null | any; // Modify the type as needed
    softwareType: string;
    solarRadiation: number;
    stationID: string;
    uv: number;
    winddir: number;
    // Add more properties as needed
}

export interface ObservationData {
    observations: Observation[];
}