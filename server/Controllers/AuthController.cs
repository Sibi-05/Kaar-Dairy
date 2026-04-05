using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(AppDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
{

    var users = await _context.Customers.ToListAsync();

    return Ok(users);
}

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto request)
    {

        var user = await _context.Customers
            .FirstOrDefaultAsync(x => x.Email == request.Email);

        if (user == null)
    return Unauthorized(new { message = "User not found" });

if (user.Password != request.Password)
    return Unauthorized(new { message = "Invalid password" });


        var token = _jwtService.GenerateToken(user.Email);

        return Ok(new
        {
            token,
            user
        });
    }


[HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto request)
{

    var existingUser = await _context.Customers
        .FirstOrDefaultAsync(x => x.Email == request.Email);

    if (existingUser != null)
        return BadRequest("User already exists");

    var user = new Customer
    {
        Name = request.Name,
        Email = request.Email,
        Password = request.Password, 
        Phone = request.Phone,
        CartJson = "[]"
    };

    _context.Customers.Add(user);
    await _context.SaveChangesAsync();

    var token = _jwtService.GenerateToken(user.Email);

    return Ok(new
    {
        token,
        user.Email,
        user.Name
    });
}
}