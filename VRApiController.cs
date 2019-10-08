using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using IBM.Cloud.SDK.Core.Authentication.Iam;
using IBM.Cloud.SDK.Core.Http;
using IBM.Watson.VisualRecognition.v3;
using IBM.Watson.VisualRecognition.v3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{

    [Route("api/images")]
    [ApiController]
    public class VRApiController : BaseApiController
    {

        private IFileService _fileService = null;
        private IAuthenticationService<int> _authService = null;
        public VRApiController(IFileService service
            , ILogger<VRApiController> logger
            , IAuthenticationService<int> authServices
           ) : base(logger)
        {
            _fileService = service;
            _authService = authServices;

        }

        [HttpGet]
        public DetailedResponse<ClassifiedImages> GetImageInfo(IFormFile file)
        {

            IamAuthenticator authenticator = new IamAuthenticator(
               apikey: );

            VisualRecognitionService service = new VisualRecognitionService("2018-03-19", authenticator);

            //DetailedResponse<ClassifiedImages> result;
            /// upload to aws bucket and create url 
            /// 
            Task<string> uploadFile = _fileService.UploadAsync(file);
           
        string imageUrl = uploadFile.Result;

            return service.Classify(url: imageUrl); 
        }

        private static readonly string awsAccessKeyId = ;

        private static readonly string awsSecretAccessKey = ;

        private static readonly string _bucketName = ;

        private async Task<PutObjectResponse> UploadAsync(Base64cs cs)
        {
            byte[] bytes = Convert.FromBase64String(cs.Base64String);
           PutObjectResponse response = null;
            using (IAmazonS3 client = new AmazonS3Client(awsAccessKeyId, awsSecretAccessKey, RegionEndpoint.USWest2))
            {

                var request = new PutObjectRequest
                {
                    BucketName = _bucketName,
                    CannedACL = S3CannedACL.PublicRead,
                    Key = string.Format("UPLOADS/{0}", "surf1"),
                    

                };
                using (var ms = new MemoryStream(bytes))
                {
                    request.InputStream = ms;
                    response= await  client.PutObjectAsync(request);
                }
                
            }
            return response;
        }



        [HttpPost("upload")]
        public ActionResult<ItemResponse<PutObjectResponse>> UploadToS3(Base64cs cs)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Task<PutObjectResponse> something = UploadAsync(cs);
                response = new ItemResponse<PutObjectResponse> { Item = something.Result };

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }
        //[HttpGet("file")]
        //public DetailedResponse<ClassifiedImages> GetInfoFromImage(IFormFile file)
        //{
        //    IamAuthenticator authenticator = new IamAuthenticator(
        //       apikey:

        //    VisualRecognitionService service = new VisualRecognitionService("2018-03-19", authenticator);

        //    DetailedResponse<ClassifiedImages> result;
        //    using (FileStream fs = System.IO.File.OpenRead("./maxresdefault.jpg"))
        //    {
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            fs.CopyTo(ms);
        //            result = service.Classify(
        //                imagesFilename: "maxresdefault.jpg",
        //                imagesFile: ms,
        //                threshold: 0.6f,
        //                owners: new List<string>()
        //                {
        //                    "me"
        //                }
        //                );
        //        }
        //    }
        //    return result;
        //}
    }
}