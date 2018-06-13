using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TaxApp.ViewModel
{
    public class TaxVM : UserVM
    {
        public Int64 GrossIncome
        {
            get; set;
        }
        public Int64 IncomeTax
        {
            get; set;
        }
        public Int64 NetIncome
        {
            get; set;
        }
        public Int64 SuperAmount
        {
            get; set;
        }
    }
}