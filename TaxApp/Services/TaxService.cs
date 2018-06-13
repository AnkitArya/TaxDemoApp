using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using TaxApp.BusinessInterface;
using TaxApp.ViewModel;

namespace TaxApp.Services
{
    public class TaxService : ITaxService
    {
        private IMapper mapper;
        private ILogger<TaxService> logger;

        public TaxService(IMapper _mapper, ILogger<TaxService> _logger)
        {
            mapper = _mapper;
            logger = _logger;
        }

        public Response<TaxVM> Calculate(UserVM userVM, bool modelState)
        {
            Response<TaxVM> response = new Response<TaxVM>();
            logger.LogInformation("User for Tax Info - @{userVM}", userVM);

            try
            {
                if (modelState)
                {
                    response = mapper.Map<Response<TaxVM>>(userVM);
                    response.Data.GrossIncome = GetGrossIncome(userVM.AnnualSalary);
                    response.Data.IncomeTax = GetIncomeTax(userVM.AnnualSalary);
                    response.Data.NetIncome = GetNetIncome(response.Data.GrossIncome, response.Data.IncomeTax);
                    response.Data.SuperAmount = GetSuperAmount(response.Data.GrossIncome, userVM.SuperRate);
                }
                else
                {
                    response.Status.Code = 422;
                    response.Status.Message = "InValid data";
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Tax Calculate Error - @{ex} ", ex);
                response.Status.Code = 500;
                response.Status.Message = ex.Message;
            }
            return response;
        }

        public Int64 GetGrossIncome(Int64 annualSalary)
        {
            return Convert.ToInt64(annualSalary / 12);
        }

        public Int64 GetIncomeTax(Int64 annualSalary)
        {
            TaxTableVM taxTable = GetTaxSlabByAnnualSalary(annualSalary);
            return Convert.ToInt64((((annualSalary - (taxTable.From - 1)) * (taxTable.CentPerDollar / 100)) + taxTable.AdditionalCharge) / 12);
        }

        public Int64 GetNetIncome(Int64 grossIncome, Int64 incomeTax)
        {
            return Convert.ToInt64(grossIncome - incomeTax);
        }

        public Int64 GetSuperAmount(Int64 grossIncome, Int64 superRate)
        {
            return Convert.ToInt64((grossIncome * superRate) / 100);
        }

        public TaxTableVM GetTaxSlabByAnnualSalary(Int64 annualSalary)
        {
            annualSalary = annualSalary < 0 ? 0 : annualSalary;
            List<TaxTableVM> TaxTables = new List<TaxTableVM>
            {
                new TaxTableVM {From = 0,  CentPerDollar = 0,AdditionalCharge = 0 },
                new TaxTableVM {From = 18201,  CentPerDollar = 19,AdditionalCharge = 0 },
                new TaxTableVM {From = 37001,  CentPerDollar = 32.5F,AdditionalCharge = 3572 },
                new TaxTableVM {From = 87001,  CentPerDollar = 37,AdditionalCharge = 19822 },
                new TaxTableVM {From = 180001,  CentPerDollar = 45,AdditionalCharge = 54232 },
            };

            return TaxTables.OrderByDescending(x => x.From).FirstOrDefault(x => x.From <= annualSalary);
        }
    }
}