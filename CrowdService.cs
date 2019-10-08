using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class CrowdService : ICrowdService
    {
        IDataProvider _data = null;

        public CrowdService(IDataProvider data)
        {
            _data = data;
        }

        public Crowd GetBySpotId(int spotId)
        {
            string procName = "[dbo].[Crowds_SelectAllBySpotId]";
            Crowd _crowd = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@SpotId", spotId);
                }, delegate (IDataReader reader, short set)
                {
                    _crowd = new Crowd();
                    int index = 0;
                    _crowd.SpotId = reader.GetSafeInt32(index++);
                    _crowd.Busy = reader.GetSafeInt32(index++);
                    _crowd.Moderate = reader.GetSafeInt32(index++);
                    _crowd.Empty = reader.GetSafeInt32(index++);

                });
            return _crowd;
        }

        public int Add(CrowdAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Crowds_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@SpotId", model.SpotId);
                    col.AddWithValue("@CrowdedLevelId", model.CrowdedLevelId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }


    }
}
