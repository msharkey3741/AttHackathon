using Newtonsoft.Json;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{

    public class ForecastServices : IForecastServices
    {
        IDataProvider _data = null;

        public ForecastServices(IDataProvider data) {
            _data = data;
        }

        public async Task<SpitCast> GetForecast(int id, string county)
        {
            SpitCast spitCast = null;

            using (var client = new HttpClient())
            {
                var forecastsUrl = new Uri($"http://api.spitcast.com/api/spot/forecast/{id}/");
                var waterTempUrl = new Uri($"http://api.spitcast.com/api/county/water-temperature/{county}/");
                var windDetailsUrl = new Uri($"http://api.spitcast.com/api/county/wind/{county}/");

                var forecastsJson = await GetSpitCast(client, forecastsUrl);
                var waterTempJson = await GetSpitCast(client, waterTempUrl);
                var windDetailsJson = await GetSpitCast(client, windDetailsUrl);

                var forecasts = new List<Forecast>();
                var waterTemp = new WaterTemp();
                var windDetails = new List<WindDetail>();

                forecasts = JsonConvert.DeserializeObject<List<Forecast>>(forecastsJson);
                waterTemp = JsonConvert.DeserializeObject<WaterTemp>(waterTempJson);
                windDetails = JsonConvert.DeserializeObject<List<WindDetail>>(windDetailsJson);

                spitCast = new SpitCast();
                spitCast.Forecasts = forecasts;
                spitCast.WaterTemp = waterTemp;
                spitCast.WindDetails = windDetails;

                return spitCast;
            }
        }

        private async Task<string> GetSpitCast(HttpClient client, Uri url)
        {
            var response = await client.GetAsync(url);
            string json;
            using (var content = response.Content)
            {
                json = await content.ReadAsStringAsync();
            }
            return json;
        }
    }
}

