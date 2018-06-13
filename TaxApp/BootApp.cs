using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using TaxApp.BusinessInterface;
using TaxApp.Services;

namespace TaxApp
{
    public class BootApp
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<ITaxService, TaxService>();
        }
    }
}