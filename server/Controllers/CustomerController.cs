using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using server.Models;
using System.Text.Json;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomerController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {

        var email = User.FindFirst(ClaimTypes.Email)?.Value;

        if (email == null)
            return Unauthorized("Invalid token");

        var user = await _context.Customers
            .Include(x => x.Orders)
            .FirstOrDefaultAsync(x => x.Email == email);

        if (user == null)
            return NotFound("User not found");

        return Ok(new
        {
            user.CustomerId,
            user.Name,
            user.Email,
            user.Phone,
            user.CartJson,
            Orders = user.Orders.Select(o => new
            {
                o.OrderId,
                o.OrderDate,
                o.TotalAmount,
                o.ProductsJson
            })
        });
    }

    [Authorize]
    [HttpGet("cart")]
    public async Task<IActionResult> GetMyCart()
    {

        var email = User.FindFirst(ClaimTypes.Email)?.Value;

        if (email == null)
            return Unauthorized("Invalid token");

        var user = await _context.Customers
            .Include(x => x.Orders)
            .FirstOrDefaultAsync(x => x.Email == email);

        if (user == null)
            return NotFound("User not found");

        return Ok(user.CartJson == "[]" ? "[]" : user.CartJson);
    }

    [Authorize]
[HttpPut("cart")]
public async Task<IActionResult> UpdateCart([FromBody] JsonElement items)
{
    var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

    if (email == null)
        return Unauthorized("Invalid token");

    var user = await _context.Customers
        .FirstOrDefaultAsync(x => x.Email == email);

    if (user == null)
        return NotFound("User not found");


    user.CartJson = items.GetRawText();

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Cart updated successfully"
    });
}

[Authorize]
[HttpPost("order")]
public async Task<IActionResult> PlaceOrder()
{

    var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

    if (email == null)
        return Unauthorized("Invalid token");

    var user = await _context.Customers
        .FirstOrDefaultAsync(x => x.Email == email);

    if (user == null)
        return NotFound("User not found");


    if (string.IsNullOrEmpty(user.CartJson))
        return BadRequest("Cart is empty");


    decimal totalAmount = 0;

try
{
    var items = JsonSerializer.Deserialize<JsonElement>(user.CartJson);

    foreach (var item in items.EnumerateArray())
    {
        var price = item.GetProperty("price").GetDecimal();
        var quantity = item.GetProperty("quantity").GetInt32();

        totalAmount += price * quantity;
    }
}
catch (Exception ex)
{
    return BadRequest($"Invalid cart format: {ex.Message}");
}


    var order = new Order
    {
        CustomerId = user.CustomerId,
        OrderDate = DateTime.UtcNow,
        TotalAmount = totalAmount,
        ProductsJson = user.CartJson
    };


    _context.Orders.Add(order);


    user.CartJson = "[]";

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Order placed successfully",
        orderId = order.OrderId,
        totalAmount = totalAmount
    });
}

[Authorize]
[HttpGet("orders")]
public async Task<IActionResult> GetMyOrders()
{
    var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

    if (email == null)
        return Unauthorized("Invalid token");

    var user = await _context.Customers
        .Include(x => x.Orders)
        .FirstOrDefaultAsync(x => x.Email == email);

    if (user == null)
        return NotFound("User not found");

    return Ok(user.Orders.Select(o => new
    {
        o.OrderId,
        o.OrderDate,
        o.TotalAmount,
        o.ProductsJson
    }));
}
}