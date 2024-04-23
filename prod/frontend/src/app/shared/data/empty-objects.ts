import { Antenna } from "../interfaces/antenna";
import { Satellite } from "../interfaces/satellite";
import { WeatherData } from "../interfaces/weather-data";

class EmptyObjects {
    getEmptyWeatherData(): WeatherData {
        return JSON.parse(JSON.stringify(EMPTY_WEATHER_DATA));
    }
    getEmptyAntennaSettings(): Antenna {
        return JSON.parse(JSON.stringify(EMPTY_ANTENNA_SETTINGS));
    }
    getEmptySatelliteSettings(): Satellite {
        return JSON.parse(JSON.stringify(EMPTY_SATELLITE_SETTINGS));
    }
}

export const EMPTY_OBJECTS: EmptyObjects = new EmptyObjects();

const EMPTY_WEATHER_DATA: WeatherData = {
    ids: [],
    timestamps: [],
    pressures: [],
    temperatures: [],
    windSpeeds: [],
    humidities: [],
    precipitations: [],
}

const EMPTY_ANTENNA_SETTINGS: Antenna = {
    name: "",
    coord: { long: 0, lat: 0 },
    antennaParams: {
        metersAboveGround: 0,
        diameter: 0,
        elevation: 0,
        frequency: 0,
        efficiency: 0,
        polarisationAngle: 0
    },
}

const EMPTY_SATELLITE_SETTINGS: Satellite = {
    name: "",
    pathHeight: 0,
}