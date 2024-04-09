using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherService.Models
{
    internal class WeatherData
    {
        
        public float pressure { get; set; }
        public int temperature { get; set; }
        public int windSpeed { get; set; }
        public int humidity { get; set; }
        public float precipitation { get; set; }

        public WeatherData() { }
    }
}
