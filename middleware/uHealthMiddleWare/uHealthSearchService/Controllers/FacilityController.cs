using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using uHealthDataAccess;
using uHealthSearchService.Models;
using uHealthSearchService.Models.FilterModels;

namespace uHealthSearchService.Controllers
{
    [RoutePrefix("Facility")]
    public class FacilityController : ApiController
    {
        [Route("GetFacility")]
        [HttpGet]
        public FacilityModel GetFacility(int skey)
        {
            using (var context = new uHealthEntities())
            {
                try
                {
                    var facility = context.facility_dimensions.Where(x => x.facility_skey == skey).FirstOrDefault();
                    return new FacilityModel()
                    {
                        FacilityKey = facility.facility_skey,
                        FacilityName = facility.facility_name,
                        Address = facility.address,
                        City = facility.city,
                        State = facility.state,
                        Zipcode = facility.zip,
                        TypeSkey = facility.facility_type_skey,
                        County = facility.county
                    };
                }
                catch (NullReferenceException e)
                {
                    return null;
                }

            }

        }

        [Route("GetFacilityDetails")]
        [HttpGet]
        public FacilityDetails GetFacilityDetails(int skey)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var fd = (from f in context.facility_dimensions
                              join pfb in context.procedure_facility_bridge on f.facility_skey equals pfb.facility_skey
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join ft in context.facility_type_dimensions on f.facility_type_skey equals ft.facility_type_skey
                              join pcd in context.procedure_code_dimensions on pfb.procedure_code equals pcd.procedure_code
                              join pd in context.physician_dimensions on fppb.npi equals pd.npi
                              join pib in context.physician_insurance_bridge on pd.npi equals pib.npi
                              join id in context.insurance_dimensions on pib.insurance_skey equals id.insurance_skey
                              where f.facility_skey == skey
                              select new
                              {
                                  f.facility_skey,
                                  f.facility_name,
                                  f.address,
                                  f.city,
                                  f.state,
                                  f.zip,
                                  f.facility_type_skey,
                                  f.county,
                                  ft.facility_type,
                                  pcd.description,
                                  pfb.total_cost,
                                  pfb.length_of_stay,
                                  pfb.expired,
                                  pfb.major_complications,
                                  pfb.minor_complications,
                                  pfb.readmit,
                                  id.insurance_skey,
                                  id.insurance_type,
                                  id.insurance_name,
                                  pcd.procedure_code,
                                  pd.npi,
                                  pd.first_name,
                                  pd.last_name,
                                  pd.specialty_skey
                              }).ToList();

                    var facilityDetails = new FacilityDetails();
                    facilityDetails.facility = new FacilityModel();
                    facilityDetails.facilityType = new FacilityTypesModel();
                    facilityDetails.statistics = new ProcedureStatisticsModel();
                    facilityDetails.insurance = new List<InsuranceTypesModel>();
                    facilityDetails.procedures = new List<ProcedureTypes>();
                    facilityDetails.physicians = new List<PhysicianModel>();
                    facilityDetails.specialties = new List<SpecialtyTypes>();


                    facilityDetails.facility.FacilityKey = fd[0].facility_skey;
                    facilityDetails.facility.FacilityName = fd[0].facility_name;
                    facilityDetails.facility.Address = fd[0].address;
                    facilityDetails.facility.City = fd[0].city;
                    facilityDetails.facility.State = fd[0].state;
                    facilityDetails.facility.Zipcode = fd[0].zip;
                    facilityDetails.facility.TypeSkey = fd[0].facility_type_skey;
                    facilityDetails.facility.County = fd[0].county;

                    facilityDetails.facilityType.FacilityTypeKey = fd[0].facility_type_skey;
                    facilityDetails.facilityType.FacilityType = fd[0].facility_type;

                    facilityDetails.statistics.ProcedureDescr = fd[0].description;
                    facilityDetails.statistics.AvgTotalCost = fd[0].total_cost;
                    facilityDetails.statistics.AvgLos = fd[0].length_of_stay;
                    facilityDetails.statistics.MortalityRate = 0;
                    facilityDetails.statistics.MajorComplicationRate = 0;
                    facilityDetails.statistics.MinorComplicationRate = 0;
                    facilityDetails.statistics.ReadmissionRate = 0;

                    foreach (var d in fd)
                    {
                        facilityDetails.insurance.Add(new InsuranceTypesModel()
                        {
                            InsuranceSKey = d.insurance_skey,
                            InsuranceName = d.insurance_name,
                            InsuranceType = d.insurance_type

                        });

                        facilityDetails.procedures.Add(new ProcedureTypes()
                        {
                            Code = d.procedure_code,
                            Description = d.description
                        });

                        facilityDetails.physicians.Add(new PhysicianModel()
                        {
                            npi = d.npi,
                            FirstName = d.first_name,
                            LastName = d.first_name,
                            Specialty = "A" //context.specialty_dimensions.Where(x => x.specialty_skey == d.specialty_skey).Select(y => y.description).FirstOrDefault().ToString()
                        });

                        facilityDetails.specialties.Add(new SpecialtyTypes()
                        {
                            SpecialtySKey = d.specialty_skey,
                            Description = "A" //context.specialty_dimensions.Where(x => x.specialty_skey == d.specialty_skey).Select(y => y.description).FirstOrDefault().ToString()
                        });
                    };
                    facilityDetails.insurance = facilityDetails.insurance.Distinct().ToList();
                    facilityDetails.procedures = facilityDetails.procedures.Distinct().ToList();
                    facilityDetails.physicians = facilityDetails.physicians.Distinct().ToList();
                    facilityDetails.specialties = facilityDetails.specialties.Distinct().ToList();
                    return facilityDetails;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetFacilityTypes")]
        [HttpGet]
        public List<FacilityTypesModel> GetFacilityTypes()
        {

            try
            {
                using (var context = new uHealthEntities())
                {
                    var ft = context.facility_type_dimensions.Distinct().ToList();
                    var facilityTypes = new List<FacilityTypesModel>();

                    foreach (var t in ft)
                    {
                        facilityTypes.Add(new FacilityTypesModel()
                        {
                            FacilityTypeKey = t.facility_type_skey,
                            FacilityType = t.facility_type
                        });
                    }
                    return facilityTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }

        }

        [Route("GetFacilityTypesByZip")]
        [HttpGet]
        public List<FacilityTypesModel> GetFacilityTypesByZip(string zip)
        {

            try
            {
                using (var context = new uHealthEntities())
                {
                    var ft = (from f in context.facility_dimensions
                              join ftd in context.facility_type_dimensions on f.facility_type_skey equals ftd.facility_type_skey
                              where f.zip == zip
                              select new
                              {
                                  ftd.facility_type_skey,
                                  ftd.facility_type
                              }).Distinct().ToList();
                    var facilityTypes = new List<FacilityTypesModel>();

                    foreach (var t in ft)
                    {
                        facilityTypes.Add(new FacilityTypesModel()
                        {
                            FacilityTypeKey = t.facility_type_skey,
                            FacilityType = t.facility_type
                        });
                    }
                    return facilityTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }

        }

        [Route("GetFacilityTypesByKey")]
        [HttpGet]
        public List<FacilityTypesModel> GetFacilityTypes(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var ft = context.facility_type_dimensions.Where(x => x.facility_type_skey == key).Distinct().ToList();
                    var facilityTypes = new List<FacilityTypesModel>();

                    foreach (var t in ft)
                    {
                        facilityTypes.Add(new FacilityTypesModel()
                        {
                            FacilityTypeKey = t.facility_type_skey,
                            FacilityType = t.facility_type
                        });
                    }
                    return facilityTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }

        }

        [Route("GetInsuranceTypes")]
        [HttpGet]
        public List<InsuranceTypesModel> GetInsuranceTypes()
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var it = context.insurance_dimensions.ToList();
                    var insuranceTypes = new List<InsuranceTypesModel>();
                    foreach (var t in it)
                    {
                        insuranceTypes.Add(new InsuranceTypesModel()
                        {
                            InsuranceSKey = t.insurance_skey,
                            InsuranceName = t.insurance_name,
                            InsuranceType = t.insurance_type
                        });
                    }
                    return insuranceTypes;
                }
            }

            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetInsuranceTypesByZip")]
        [HttpGet]
        public List<InsuranceTypesModel> GetInsuranceTypesByZip(string zip)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var it = (from f in context.facility_dimensions
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join pib in context.physician_insurance_bridge on fppb.npi equals pib.npi
                              join id in context.insurance_dimensions on pib.insurance_skey equals id.insurance_skey
                              where (f.zip == zip)
                              select new
                              {
                                  id.insurance_skey,
                                  id.insurance_type,
                                  id.insurance_name,
                              }).Distinct().ToList();

                    var insuranceTypes = new List<InsuranceTypesModel>();
                    foreach (var t in it)
                    {
                        insuranceTypes.Add(new InsuranceTypesModel()
                        {
                            InsuranceSKey = t.insurance_skey,
                            InsuranceName = t.insurance_name,
                            InsuranceType = t.insurance_type
                        });
                    }
                    return insuranceTypes;
                }
            }

            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetInsuranceTypesByKey")]
        [HttpGet]
        public List<InsuranceTypesModel> GetInsuranceTypesByKey(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var it = (from f in context.facility_dimensions
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join pib in context.physician_insurance_bridge on fppb.npi equals pib.npi
                              join id in context.insurance_dimensions on pib.insurance_skey equals id.insurance_skey
                              where (f.facility_skey == key)
                              select new
                              {
                                  id.insurance_skey,
                                  id.insurance_type,
                                  id.insurance_name,
                              }).Distinct().ToList();

                    var insuranceTypes = new List<InsuranceTypesModel>();
                    foreach (var t in it)
                    {
                        insuranceTypes.Add(new InsuranceTypesModel()
                        {
                            InsuranceSKey = t.insurance_skey,
                            InsuranceName = t.insurance_name,
                            InsuranceType = t.insurance_type
                        });
                    }
                    return insuranceTypes;
                }
            }

            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetProcedureTypes")]
        [HttpGet]
        public List<ProcedureTypes> GetProcedureTypes()
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var pt = context.procedure_code_dimensions.ToList();
                    var procedureTypes = new List<ProcedureTypes>();
                    foreach (var t in pt)
                    {
                        procedureTypes.Add(new ProcedureTypes()
                        {
                            Code = t.procedure_code,
                            Description = t.description
                        });
                    }
                    return procedureTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetProcedureTypesByZip")]
        [HttpGet]
        public List<ProcedureTypes> GetProcedureTypesByZip(string zip)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var pt = (from f in context.facility_dimensions
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join pb in context.procedure_base on fppb.procedure_code equals pb.procedure_code
                              join pcd in context.procedure_code_dimensions on pb.procedure_code equals pcd.procedure_code
                              where f.zip == zip
                              select new
                              {
                                  pcd.procedure_code,
                                  pcd.description
                              }).Distinct().ToList();
                    var procedureTypes = new List<ProcedureTypes>();
                    foreach (var t in pt)
                    {
                        procedureTypes.Add(new ProcedureTypes()
                        {
                            Code = t.procedure_code,
                            Description = t.description
                        });
                    }
                    return procedureTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetProcedureTypesByKey")]
        [HttpGet]
        public List<ProcedureTypes> GetProcedureTypesByKey(int key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var pt = (from f in context.facility_dimensions
                              //join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join fpb in context.procedure_facility_bridge on f.facility_skey equals fpb.facility_skey
                              //join pb in context.procedure_base on fppb.procedure_code equals pb.procedure_code
                              join pcd in context.procedure_code_dimensions on fpb.procedure_code equals pcd.procedure_code
                              where f.facility_skey == key
                              select new
                              {
                                  pcd.procedure_code,
                                  pcd.description
                              }).Distinct().ToList();
                    var procedureTypes = new List<ProcedureTypes>();
                    foreach (var t in pt)
                    {
                        procedureTypes.Add(new ProcedureTypes()
                        {
                            Code = t.procedure_code,
                            Description = t.description
                        });
                    }
                    return procedureTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetPhysiciansByKey")]
        [HttpGet]
        public List<PhysicianModel> GetPhysiciansByKey(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var ph = (from fppb in context.facility_physician_procedures_bridge
                              join pd in context.physician_dimensions on fppb.npi equals pd.npi
                              join sd in context.specialty_dimensions on pd.specialty_skey equals sd.specialty_skey
                              where fppb.facility_skey == key
                              select new
                              {
                                  pd.first_name,
                                  pd.last_name,
                                  pd.npi,
                                  sd.description
                              }).Distinct().ToList();
                    var physicians = new List<PhysicianModel>();
                    foreach (var p in ph)
                    {
                        physicians.Add(new PhysicianModel()
                        {
                            FirstName = p.first_name,
                            LastName = p.last_name,
                            npi = p.npi,
                            Specialty = p.description
                        });
                    }
                    return physicians;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetSpecialtyTypes")]
        [HttpGet]
        public List<SpecialtyTypes> GetSpecialtyTypes()
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var st = context.specialty_dimensions.ToList();
                    var specialtyTypes = new List<SpecialtyTypes>();
                    foreach (var t in st)
                    {
                        specialtyTypes.Add(new SpecialtyTypes()
                        {
                            SpecialtySKey = t.specialty_skey,
                            Description = t.description
                        });
                    }
                    return specialtyTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetSpecialtyTypesByZip")]
        [HttpGet]
        public List<SpecialtyTypes> GetSpecialtyTypesByZip(string zip)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var st = (from f in context.facility_dimensions
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join pd in context.physician_dimensions on fppb.npi equals pd.npi
                              join sd in context.specialty_dimensions on pd.specialty_skey equals sd.specialty_skey
                              where f.zip == zip
                              select new
                              {
                                  sd.specialty_skey,
                                  sd.description
                              }).Distinct().ToList();
                    var specialtyTypes = new List<SpecialtyTypes>();
                    foreach (var t in st)
                    {
                        specialtyTypes.Add(new SpecialtyTypes()
                        {
                            SpecialtySKey = t.specialty_skey,
                            Description = t.description
                        });
                    }
                    return specialtyTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetSpecialtyTypesByKey")]
        [HttpGet]
        public List<SpecialtyTypes> GetSpecialtyTypesByKey(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var st = (from f in context.facility_dimensions
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join pd in context.physician_dimensions on fppb.npi equals pd.npi
                              join sd in context.specialty_dimensions on pd.specialty_skey equals sd.specialty_skey
                              where f.facility_skey == key
                              select new
                              {
                                  sd.specialty_skey,
                                  sd.description
                              }).Distinct().ToList();
                    var specialtyTypes = new List<SpecialtyTypes>();
                    foreach (var t in st)
                    {
                        specialtyTypes.Add(new SpecialtyTypes()
                        {
                            SpecialtySKey = t.specialty_skey,
                            Description = t.description
                        });
                    }
                    return specialtyTypes;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetFacilitiesByZipcode")]
        [HttpGet]
        public List<FacilityModel> GetFacilitiesByZipcode(string zip)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var fl = context.facility_dimensions.Where(x => x.zip == zip).ToList();
                    var facilityList = new List<FacilityModel>();
                    foreach (var f in fl)
                    {
                        facilityList.Add(new FacilityModel()
                        {
                            FacilityKey = f.facility_skey,
                            FacilityName = f.facility_name,
                            Address = f.address,
                            City = f.city,
                            State = f.state,
                            Zipcode = f.zip,
                            TypeSkey = f.facility_type_skey,
                            County = f.county
                        });
                    }
                    return facilityList;
                }
            }

            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetFacilityByKey")]
        [HttpGet]
        public FacilityModel GetFacilitiesByKey(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var fl = context.facility_dimensions.Where(x => x.facility_skey == key).FirstOrDefault();
                    var facility = new FacilityModel()
                    {
                        FacilityKey = fl.facility_skey,
                        FacilityName = fl.facility_name,
                        Address = fl.address,
                        City = fl.city,
                        State = fl.state,
                        Zipcode = fl.zip,
                        TypeSkey = fl.facility_type_skey,
                        County = fl.county,
                    };
                    return facility;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetProcedureStatisticsByKey")]
        [HttpGet]
        public List<ProcedureStatisticsModel> GetStatisticsByKey(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var stats = (from pfb in context.procedure_facility_bridge
                                 join pcd in context.procedure_code_dimensions on pfb.procedure_code equals pcd.procedure_code
                                 where pfb.facility_skey == key
                                 select new
                                 {
                                     pcd.description,
                                     pfb.procedure_code,
                                     pfb.facility_skey,
                                     pfb.total_cost,
                                     pfb.length_of_stay,
                                     pfb.expired,
                                     pfb.major_complications,
                                     pfb.minor_complications,
                                     pfb.readmit
                                 }).ToList();

                    var procedureStatistics = new List<ProcedureStatisticsModel>();
                    var duplicatePS = new List<ProcedureStatisticsModel>();
                    var createNew = false;
                    foreach (var st in stats)
                    {
                        if (procedureStatistics.Count == 0)
                        {
                            procedureStatistics.Add(new ProcedureStatisticsModel()
                            {
                                ProcedureDescr = st.description,
                                ProcedureCode = st.procedure_code,
                                FacilitySKey = st.facility_skey,
                                AvgTotalCost = st.total_cost,
                                AvgLos = st.length_of_stay,
                                MortalityRate = st.expired == false ? 0 : 1,
                                MinorComplicationRate = st.minor_complications == false ? 0 : 1,
                                MajorComplicationRate = st.major_complications == false ? 0 : 1,
                                ReadmissionRate = st.readmit == false ? 0 : 1,
                                Count = 1
                            });
                        }
                        else
                        {
                            foreach (var ps in procedureStatistics)
                            {
                                createNew = false;
                                if (ps.FacilitySKey == st.facility_skey && ps.ProcedureCode == st.procedure_code)
                                {
                                    ps.AvgTotalCost += st.total_cost;
                                    ps.AvgLos += st.length_of_stay;
                                    ps.MortalityRate += st.expired == false ? 0 : 1;
                                    ps.MajorComplicationRate += st.major_complications == false ? 0 : 1;
                                    ps.MinorComplicationRate += st.minor_complications == false ? 0 : 1;
                                    ps.ReadmissionRate += st.readmit == false ? 0 : 1;
                                    ps.Count += 1;

                                }
                                else
                                {
                                    createNew = true;
                                    continue;

                                }
                            }
                            if (createNew)
                            {
                                procedureStatistics.Add(new ProcedureStatisticsModel()
                                {
                                    ProcedureDescr = st.description,
                                    ProcedureCode = st.procedure_code,
                                    FacilitySKey = st.facility_skey,
                                    AvgTotalCost = st.total_cost,
                                    AvgLos = st.length_of_stay,
                                    MortalityRate = st.expired == false ? 0 : 1,
                                    MinorComplicationRate = st.minor_complications == false ? 0 : 1,
                                    MajorComplicationRate = st.major_complications == false ? 0 : 1,
                                    ReadmissionRate = st.readmit == false ? 0 : 1,
                                    Count = 1
                                });
                            }
                        }
                    }

                    foreach (var ps in procedureStatistics)
                    {
                        ps.AvgTotalCost = ps.AvgTotalCost / ps.Count;
                        ps.AvgLos = ps.AvgLos / ps.Count;
                        ps.MortalityRate = ps.MortalityRate / ps.Count;
                        ps.MinorComplicationRate = ps.MinorComplicationRate / ps.Count;
                        ps.MajorComplicationRate = ps.MajorComplicationRate / ps.Count;
                        ps.ReadmissionRate = ps.ReadmissionRate / ps.Count;
                    }

                    return procedureStatistics;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetFilterMap")]
        [HttpGet]
        public List<FacilityModel> GetFilterMap(int? facilityTypeSkey, int? insuranceTypeSkey, string procedureCode, int? specialtyTypeSkey, string zip)
        {
            try
            {
                using (var context = new uHealthEntities())
                {
                    var fm = (from f in context.facility_dimensions
                              join fppb in context.facility_physician_procedures_bridge on f.facility_skey equals fppb.facility_skey
                              join pd in context.physician_dimensions on fppb.npi equals pd.npi
                              join pib in context.physician_insurance_bridge on pd.npi equals pib.npi
                              join id in context.insurance_dimensions on pib.insurance_skey equals id.insurance_skey
                              join sd in context.specialty_dimensions on pd.specialty_skey equals sd.specialty_skey
                              where (f.zip == zip)
                              && (!facilityTypeSkey.HasValue ? true : f.facility_type_skey == facilityTypeSkey)
                              && (!insuranceTypeSkey.HasValue ? true : id.insurance_skey == insuranceTypeSkey)
                              && (procedureCode == null ? true : fppb.procedure_code == procedureCode)
                              && (!specialtyTypeSkey.HasValue ? true : sd.specialty_skey == specialtyTypeSkey)
                              select new
                              {
                                  f.facility_skey,
                                  f.facility_name,
                                  f.address,
                                  f.city,
                                  f.state,
                                  f.zip,
                                  f.county,
                                  f.facility_type_skey
                              }).Distinct().ToList();
                    var facilities = fm.Select(f => new FacilityModel()
                    {
                        FacilityKey = f.facility_skey,
                        FacilityName = f.facility_name,
                        Address = f.address,
                        City = f.city,
                        State = f.state,
                        Zipcode = f.zip,
                        County = f.county,
                        TypeSkey = f.facility_type_skey
                    }).ToList();
                    return facilities;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }

        [Route("GetFacilityTypesForFilter")]
        [HttpGet]
        public FacilityTypesFilter GetFacilityTypesForFilter(int? key)
        {
            try
            {
                using (var context = new uHealthEntities())
                {

                    var ft = (from f in context.facility_dimensions
                              join ftd in context.facility_type_dimensions on f.facility_type_skey equals ftd.facility_type_skey
                              where f.facility_skey == key
                              select new
                              {
                                  f.facility_skey,
                                  ftd.facility_type_skey,
                                  ftd.facility_type
                              }).FirstOrDefault();

                    var facilityTypesForFilter = new FacilityTypesFilter()
                    {
                        FacilityKey = ft.facility_skey,
                        FacilityTypeKey = ft.facility_type_skey,
                        FacilityType = ft.facility_type
                    };

                    return facilityTypesForFilter;
                }
            }
            catch (NullReferenceException)
            {
                return null;
            }

        }
    }
}
