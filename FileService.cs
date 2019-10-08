using Amazon;
using Amazon.S3;
using Microsoft.Extensions.Options;
using Sabio.Data.Providers;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using Amazon.S3.Transfer;

namespace Sabio.Services
{
    public class FileService : IFileService
    {
        IDataProvider _data = null;

        private IAmazonS3 _client;
        private RegionEndpoint bucketRegion;
        private AWSCredential _awsCredential;
        public FileService(IDataProvider data, IOptions<AWSCredential> awsCredential)
        {
            _data = data;
            _awsCredential = awsCredential.Value;
        }


        public async Task<string> UploadAsync(IFormFile file)
        {
            bucketRegion = RegionEndpoint.GetBySystemName(_awsCredential.BucketRegion);

            _client = new AmazonS3Client(_awsCredential.AccessKey, _awsCredential.Secret, bucketRegion);




            var fileTransferUtility = new TransferUtility(_client);

            using (Stream stream = file.OpenReadStream())
            {
                await fileTransferUtility.UploadAsync(stream, _awsCredential.BucketName, keyName);
            }
            string url = _awsCredential.Domain + keyName;


            return url;
        }

    }
}
    
