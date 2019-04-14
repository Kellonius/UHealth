using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uHealthSearchService.Models
{
    public class FacilityModel
    {
        public int? FacilityKey { get; set; }
        public string FacilityName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public int? TypeSkey { get; set; }
        public string County { get; set; }
    }
}