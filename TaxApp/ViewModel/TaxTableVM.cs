using System;
using System.Collections.Generic;
using System.Text;

namespace TaxApp.ViewModel
{
    public class TaxTableVM
    {
        public int From { get; set; }
        public float CentPerDollar { get; set; }
        public int AdditionalCharge { get; set; }

    }
}