using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherService.Models
{
    public class WeatherDataWeatherUnderground
    {
        public Observation[] observations { get; set; }
    }

    public class Observation
    {
        public string stationID { get; set; }
        public string obsTimeUtc { get; set; }
        public string obsTimeLocal { get; set; }
        public string neighborhood { get; set; }
        public string softwareType { get; set; }
        public string country { get; set; }
        public float? solarRadiation { get; set; }
        public float lon { get; set; }
        public object realtimeFrequency { get; set; }
        public int epoch { get; set; }
        public float lat { get; set; }
        public int? uv { get; set; }
        public int winddir { get; set; }
        public int humidity { get; set; }
        public int qcStatus { get; set; }
        public Metric metric { get; set; }
    }

    public class Metric
    {
        public int temp { get; set; }
        public int heatIndex { get; set; }
        public int dewpt { get; set; }
        public int windChill { get; set; }
        public int windSpeed { get; set; }
        public int windGust { get; set; }
        public float pressure { get; set; }
        public object precipRate { get; set; }
        public float precipTotal { get; set; }
        public int elev { get; set; }
    }
}
