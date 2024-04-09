using WeatherService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace WeatherService.Services
{
    public class MasterService
    {

       private PostService postService = new PostService();
       
        public MasterService() {
            postService.PostRetreivedDataEvent+=OnRetreivedDataEvent;
            postService.InsertedDataEvent += OnInsertedDataEvent;

           // Console.Read();
        }

        public void startGettingAndInsertingWeatherData()
        {
            postService.startGettingWeatherData();
        }

        private void OnRetreivedDataEvent(object sender, PostEventArgs e)
        {
            // Console.WriteLine(e.message);
            
            WeatherDataWeatherUnderground weatherData = JsonSerializer.Deserialize<WeatherDataWeatherUnderground>(e.message);
            Console.WriteLine(weatherData?.observations[0].metric.pressure);

            WeatherData w = new WeatherData();
            w.pressure = (float)(weatherData?.observations[0].metric.pressure);
            w.temperature = (int)(weatherData?.observations[0].metric.temp);
            w.windSpeed = (int)(weatherData?.observations[0].metric.windSpeed);
            w.humidity = (int)(weatherData?.observations[0].humidity);
            w.precipitation = (float)(weatherData?.observations[0].metric.precipTotal);

            string json=JsonSerializer.Serialize(w);
            postService.startInsertingWeatherData(json);

        }

        private void OnInsertedDataEvent(object sender, PostEventArgs e)
        {
            Console.WriteLine(e.message);
           // System.Environment.Exit(0);

        }

    }
}
