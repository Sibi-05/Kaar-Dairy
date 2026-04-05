using System;

namespace server.Models;

public class Customer
{
    public int CustomerId {get;set;}
    public string Name {get;set;}
    public string Phone {get;set;}
    public string Email {get;set;}
    public string Password {get;set;}
    public List<Order> Orders {get;set;}

    public string CartJson {get;set;}

}
