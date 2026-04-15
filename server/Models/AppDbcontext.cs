using System;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    public DbSet<Customer> Customers {get;set;}
    public DbSet<Visits> Visits {get;set;}
    public DbSet<Order> Orders {get;set;}
}
