using Sabio.Models.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IForecastServices
    {
        Task<SpitCast> GetForecast(int id, string county);
    }
}