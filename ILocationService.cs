using Sabio.Models;
using Sabio.Models.Domain.Location;
using System.Collections.Generic;

namespace Sabio.Services.LocationServices
{
    public interface ILocationService
    {
        Location GetById(int Id);
        List<Location> GetAll();
    }
}