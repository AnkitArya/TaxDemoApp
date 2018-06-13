using Microsoft.AspNetCore.Mvc;
using TaxApp.BusinessInterface;
using TaxApp.ViewModel;

namespace TaxApp.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TaxController : Controller
    {
        private ITaxService _taxService;

        public TaxController(ITaxService taxService)
        {
            _taxService = taxService;
        }

        [HttpPost]
        public Response<TaxVM> Post([FromBody] UserVM userVM)
        {
            return _taxService.Calculate(userVM, ModelState.IsValid);
        }
    }
}
