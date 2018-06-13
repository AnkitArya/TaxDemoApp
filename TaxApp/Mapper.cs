using System.IO;
using System.Globalization;
using AutoMapper;
using TaxApp.ViewModel;

namespace TaxApp
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap(typeof(object), typeof(Response<>)).ForMember("Data", o => o.MapFrom(s => s)).ForMember("Status", opt => opt.Ignore());
            CreateMap<UserVM, TaxVM>().ReverseMap();
        }
    }
}