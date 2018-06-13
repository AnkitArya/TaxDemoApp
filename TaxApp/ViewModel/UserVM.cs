using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TaxApp.ViewModel
{
    public class UserVM
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Range(1, Int64.MaxValue)]
        public Int64 AnnualSalary { get; set; }

        [Range(1, Int64.MaxValue)]
        public Int64 SuperRate { get; set; }

        [Required]
        public string PaymentStartDate { get; set; }
    }
}