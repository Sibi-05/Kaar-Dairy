using System;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VisitController : ControllerBase
{
    private readonly AppDbContext _context;

    public VisitController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
public async Task<IActionResult> AddVisit([FromBody] Visits request)
{
    if (request == null || string.IsNullOrEmpty(request.Username))
    {
        return BadRequest("Invalid data");
    }

    var visit = new Visits
    {
        Username = request.Username,
        VisitTime = request.VisitTime // coming from frontend
    };

    _context.Visits.Add(visit);
    await _context.SaveChangesAsync();

    return Ok(visit);
}

[HttpGet]
public async Task<IActionResult> GetVisit([FromBody] Visits request)
{
    var users = await _context.Visits.ToListAsync();

    return Ok(users);
}
}
