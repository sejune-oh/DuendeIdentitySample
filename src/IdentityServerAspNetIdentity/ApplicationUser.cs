using Microsoft.AspNetCore.Identity;

namespace IdentityServerAspNetIdentity
{
    public class ApplicationUser : IdentityUser
    {
        public string? FavoriteColor { get; set; }
        public string? MobileNumber { get; set; }
    }
}
