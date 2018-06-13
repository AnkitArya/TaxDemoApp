using AutoMapper;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxApp.Services;
using TaxApp.ViewModel;
using Xunit;

namespace TaxApp.Test
{
    public class TaxServiceTest
    {
        private TaxService taxService;

        public TaxServiceTest()
        {
            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Mapper>();
            }).CreateMapper();

            Log.Logger = new LoggerConfiguration()
                        .MinimumLevel.Debug()
                        .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                        .Enrich.FromLogContext()
                        .WriteTo.RollingFile("wwwroot//Logs//log-{Date}.txt").CreateLogger();

            var logger = new LoggerFactory().CreateLogger<TaxService>();
            taxService = new TaxService(mapper, logger);
        }

        [Theory]
        [InlineData(60050, 5004)]
        [InlineData(0, 0)]
        [InlineData(-1, 0)]
        [InlineData(-24, -2)]
        public void Test_GrossIncome(Int64 annualSalary, Int64 expected)
        {
            var actual = taxService.GetGrossIncome(annualSalary);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(0, 0)]
        [InlineData(-1, 0)]
        [InlineData(18200, 0)]
        [InlineData(37000, 298)]
        [InlineData(60050, 922)]
        [InlineData(87000, 1652)]
        [InlineData(180000, 4519)]
        [InlineData(280000, 8269)]
        public void Test_IncomeTax(Int64 annualSalary, Int64 expected)
        {
            var actual = taxService.GetIncomeTax(annualSalary);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(0, 0, 0)]
        [InlineData(-1, -1, 0)]
        [InlineData(0, -1, 1)]
        [InlineData(-1, 0, -1)]
        [InlineData(-1, 1, -2)]
        [InlineData(1, -1, 2)]
        [InlineData(10, -20, 30)]
        [InlineData(5004, 922, 4082)]
        public void Test_NetIncome(Int64 grossIncome, Int64 incomeTax, Int64 expected)
        {
            var actual = taxService.GetNetIncome(grossIncome, incomeTax);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(5004, 9, 450)]
        [InlineData(0, 0, 0)]
        [InlineData(-1, -1, 0)]
        [InlineData(20000, 8, 1600)]
        public void Test_SuperAmount(Int64 grossIncome, Int64 superRate, Int64 expected)
        {
            var actual = taxService.GetSuperAmount(grossIncome, superRate);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(0, 0)]
        [InlineData(-1, 0)]
        [InlineData(18200, 0)]
        [InlineData(37000, 18201)]
        [InlineData(60050, 37001)]
        [InlineData(87000, 37001)]
        [InlineData(180000, 87001)]
        [InlineData(280000, 180001)]
        public void Test_TaxSlab(Int64 annualSalary, Int64 expected)
        {
            var actual = taxService.GetTaxSlabByAnnualSalary(annualSalary);
            Assert.Equal(expected, actual.From);
        }

    }
}
