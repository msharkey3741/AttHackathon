using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;

namespace Sabio.Services
{
    public class ForecastObsolete
    {
        protected void Page_Load(object sender, EventArgs e)

        {
            string strurltest = String.Format("http://api.spitcast.com/api/spot/forecast/604/");
            WebRequest requestObjGet = WebRequest.Create(strurltest);
            requestObjGet.Method = "GET";
            HttpWebResponse responseObjGet = null;
            responseObjGet = (HttpWebResponse)requestObjGet.GetResponse();

            string strresulttest = null;
            using (Stream stream = responseObjGet.GetResponseStream())
            {
                StreamReader sr = new StreamReader(stream);
                strresulttest = sr.ReadToEnd();
                sr.Close();
            }
        }


    }
}
