using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherService.Models
{
    public class PostEventArgs:EventArgs
    {
        public string message="";

        public PostEventArgs(string message)
        {
            this.message = message;
        }


    }
}
