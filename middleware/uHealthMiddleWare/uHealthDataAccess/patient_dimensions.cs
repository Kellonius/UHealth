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
    
    public partial class patient_dimensions
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public patient_dimensions()
        {
            this.procedure_facility_bridge = new HashSet<procedure_facility_bridge>();
        }
    
        public int patient_skey { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<procedure_facility_bridge> procedure_facility_bridge { get; set; }
    }
}
