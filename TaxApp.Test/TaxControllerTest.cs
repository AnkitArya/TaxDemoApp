using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TaxApp.ViewModel;
using Xunit;

namespace TaxApp.Test
{
    public class TaxControllerTest : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public TaxControllerTest(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Theory]
        [InlineData("/api/tax")]
        public async Task Test_Valid_Tax_Data(string url)
        {
            var userVM = new UserVM()
            {
                AnnualSalary = 1000,
                FirstName = "Ankit",
                LastName = "Arya",
                SuperRate = 8,
                PaymentStartDate = "1 March - 31 March"
            };

            //Act
            var result = await _client.PostAsJsonAsync(url, userVM);
            //Assert
            result.EnsureSuccessStatusCode();

            var responseString = await result.Content.ReadAsStringAsync();

            var response = JsonConvert.DeserializeObject<Response<TaxVM>>(responseString);

            Assert.Equal(200, response.Status.Code);
        }


        [Theory]
        [InlineData("/api/tax")]
        public async Task Test_Invalid_Tax_Data(string url)
        {
            var userVM = new UserVM()
            {
                AnnualSalary = 520,
                FirstName = "",
                LastName = "Arya",
                SuperRate = 0,
                PaymentStartDate = "1 March - 31 March"
            };

            //Act
            var result = await _client.PostAsJsonAsync(url, userVM);
            //Assert
            result.EnsureSuccessStatusCode();

            var responseString = await result.Content.ReadAsStringAsync();

            var response = JsonConvert.DeserializeObject<Response<TaxVM>>(responseString);

            Assert.Equal(422, response.Status.Code);
        }

        [Theory]
        [InlineData("/api/tax")]
        public async Task Test_Valid_Tax_Data_Calculation(string url)
        {
            var userVM = new UserVM()
            {
                AnnualSalary = 60050,
                FirstName = "Andrew",
                LastName = "Smith",
                SuperRate = 9,
                PaymentStartDate = "1 March - 31 March"
            };

            var expectedTax = new TaxVM()
            {
                FirstName = userVM.FirstName,
                LastName = userVM.LastName,
                AnnualSalary = userVM.AnnualSalary,
                SuperRate = userVM.SuperRate,
                PaymentStartDate = userVM.PaymentStartDate,
                IncomeTax = 922,
                GrossIncome = 5004,
                NetIncome = 4082,
                SuperAmount = 450
            };

            //Act
            var result = await _client.PostAsJsonAsync(url, userVM);

            var responseString = await result.Content.ReadAsStringAsync();

            var response = JsonConvert.DeserializeObject<Response<TaxVM>>(responseString);

            var actual = response.Data;

            Assert.Equal(200, response.Status.Code);
            Assert.Equal(expectedTax.GrossIncome, actual.GrossIncome);
            Assert.Equal(expectedTax.IncomeTax, actual.IncomeTax);
            Assert.Equal(expectedTax.NetIncome, actual.NetIncome);
            Assert.Equal(expectedTax.SuperAmount, actual.SuperAmount);
            Assert.Equal(expectedTax.GrossIncome, actual.GrossIncome);
        }
    }
}
