using System;

namespace server.Models;

public class Order
{
    public int OrderId {get;set;}
    public int CustomerId {get;set;}
    public DateTime OrderDate {get;set;}
    public decimal TotalAmount {get;set;}

    public string ProductsJson {get;set;}

    public Customer Customer {get;set;}
}
