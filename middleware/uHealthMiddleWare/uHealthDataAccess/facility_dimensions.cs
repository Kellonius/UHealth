//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace uHealthDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class facility_dimensions
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public facility_dimensions()
        {
            this.facility_physician_procedures_bridge = new HashSet<facility_physician_procedures_bridge>();
            this.procedure_facility_bridge = new HashSet<procedure_facility_bridge>();
        }
    
        public int facility_skey { get; set; }
        public string facility_name { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string county { get; set; }
        public int facility_type_skey { get; set; }
    
        public virtual facility_type_dimensions facility_type_dimensions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<facility_physician_procedures_bridge> facility_physician_procedures_bridge { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<procedure_facility_bridge> procedure_facility_bridge { get; set; }
    }
}