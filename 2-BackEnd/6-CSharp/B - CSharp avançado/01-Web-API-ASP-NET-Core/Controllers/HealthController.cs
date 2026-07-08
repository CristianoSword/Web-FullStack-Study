using Microsoft.AspNetCore.Mvc;

namespace Study.CSharp.WebApiAspNetCore.Controllers;

[ApiController]
[Route("api/health")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "ok",
            utcTime = DateTimeOffset.UtcNow,
        });
    }
}
