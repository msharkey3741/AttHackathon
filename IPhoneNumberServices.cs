using Sabio.Models;
using Sabio.Models.Domain.PhoneNumber;
using Sabio.Models.Requests;

namespace Sabio.Services.PhoneNumerServices
{
    public interface IPhoneNumberServices
    {
        int Create(PhoneNumberAddRequest model);
        Paged<PhoneNumbers> Paginate(int pageIndex, int pageSize);
    }
}