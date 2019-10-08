using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface ICrowdService
    {
        Crowd GetBySpotId(int spotId);
        int Add(CrowdAddRequest model);
    }
}