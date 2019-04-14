using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uHealthSearchService.Models
{
    public class PhysicianModel
    {
        public int? npi { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Specialty { get; set; }
    }
}