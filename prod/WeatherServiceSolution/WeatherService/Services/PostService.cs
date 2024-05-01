using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WeatherService.Models;

namespace WeatherService.Services
{
    public class PostService
    {
        string url = "https://weather.versionx.ch/api/";

        public event EventHandler<PostEventArgs> PostRetreivedDataEvent; 
        public event EventHandler<PostEventArgs> InsertedDataEvent;

        public PostService() { }    

        public void startGettingWeatherData()
        {
            Thread thread = new Thread(GetWeatherData);
            thread.IsBackground = true;    
            thread.Start();
        }

        public void startInsertingWeatherData(string json)
        {
            Thread thread= new Thread(new ParameterizedThreadStart(InsertWeatherData));
            thread.IsBackground = true;
            thread.Start(json);
        }

        public void InsertWeatherData(object jsonObject)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url+"insertWeatherData.php");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json=(string)jsonObject;
                Console.WriteLine(json);
                streamWriter.Write(json);
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                InsertedDataEvent?.Invoke(this,new PostEventArgs(result));
            }
        }


        public async void GetWeatherData()
        {

            try
            {

                string jsonData = "{}"; 

                using (HttpClient client = new HttpClient())
                {
                    var content = new StringContent(jsonData, System.Text.Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(url+ "loadWeatherDataFromWeatherUnderground.php", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseJson = await response.Content.ReadAsStringAsync();
                        // Console.WriteLine(responseJson);
                        PostRetreivedDataEvent?.Invoke(this,new PostEventArgs(responseJson));
                    }
                    else
                    {
                        Console.WriteLine("Error: " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
            }
        }
    }
}
