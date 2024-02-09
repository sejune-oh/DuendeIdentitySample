using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// JWT authentication
builder.Services.AddAuthentication().AddJwtBearer(options => {
    options.Authority = "https://localhost:5001";
    options.TokenValidationParameters.ValidateAudience = false;
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ApiScope", policy=>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("scope", "api");
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

// Add route
app.MapGet("identity", (ClaimsPrincipal user) => user.Claims.Select(c => new { c.Type, c.Value }))
    .RequireAuthorization("ApiScope");


app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
