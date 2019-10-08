using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/crowds")]
    [ApiController]
    public class CrowdApiController : BaseApiController
    {

        private ICrowdService _service = null;

        public CrowdApiController(ICrowdService service,
            ILogger<CrowdApiController> logger) : base(logger)
        {
            _service = service;
        }
        [HttpGet("{spotId:int}")]
        public ActionResult<ItemResponse<Crowd>> Get(int spotId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Crowd _crowd = _service.GetBySpotId(spotId);

                if (_crowd == null)

                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Crowd> { Item = _crowd };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                {
                    base.Logger.LogError(ex.ToString());

                }
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Created(CrowdAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.Add(model);
                Crowd _crowd = _service.GetBySpotId(model.SpotId);
                ItemResponse<Crowd> response = new ItemResponse<Crowd> { Item = _crowd };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }



    }
}