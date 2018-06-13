using System;
using System.Collections.Generic;
using System.Text;

namespace TaxApp.ViewModel
{
    public class Response<T>
    {
        public T Data { get; set; }
        public Status Status { get; set; } = new Status();
    }

    public class Status
    {
        public int Code { get; set; } = 200;
        public string Message { get; set; } = "Success";
    }
}