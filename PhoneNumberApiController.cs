using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.PhoneNumber;
using Sabio.Models.Requests;
using Sabio.Services.PhoneNumerServices;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/phonenumber")]
    [ApiController]
    public class PhoneNumberApiController : BaseApiController
    {
        private IPhoneNumberServices _service = null;
        public PhoneNumberApiController(IPhoneNumberServices service, ILogger<PhoneNumberApiController> logger) : base(logger)
        {
            _service = service;
        }
        [HttpGet("paginate")]
        public ActionResult<ItemsResponse<Paged<PhoneNumbers>>> Paginate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<PhoneNumbers> paged = _service.Paginate(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<PhoneNumbers>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(PhoneNumberAddRequest model)
        {
            ObjectResult result = null;
            try
            {

                int id = _service.Create(model);
                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }
    }
}