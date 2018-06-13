using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaxApp.ViewModel;

namespace TaxApp.BusinessInterface
{
    public interface ITaxService
    {
        Response<TaxVM> Calculate(UserVM userVM, bool modelState);
    }
}