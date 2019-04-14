using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using uHealthDataAccess;
using uHealthSearchService.Models;

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
                    var ft = context.facility_type_dimensions.ToList();
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
    }
}
