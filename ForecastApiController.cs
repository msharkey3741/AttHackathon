using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/spot/forecast"), AllowAnonymous]
    [ApiController]
    public class ForecastApiController : BaseApiController
    {
        private IForecastServices _forecastServices = null;
        public ForecastApiController(IForecastServices service, ILogger<ForecastApiController> logger) : base(logger)
        {
            _forecastServices = service;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Forecast>> GetForecast(int id, string county)
        {
            int code = 201;
            BaseResponse response = null;
            try
            {

                  Task<SpitCast> forecasts = _forecastServices.GetForecast(id, county);
                    if (forecasts == null)
                    {
                        code = 404;
                        response = new ErrorResponse("App Resource not found.");
                    }
                    else
                    {
                        SpitCast forecastResults = forecasts.Result;   
                        response = new ItemResponse<SpitCast> { Item = forecastResults };
                    }
                
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

    }
}


//http://api.spitcast.com/api/spot/forecast/604/
//http://api.giphy.com/v1/gifs/search?api_key={giphyKey}&q={searchCritera}&limit=1