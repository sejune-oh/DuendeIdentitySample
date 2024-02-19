using Duende.IdentityServer.Services;
using Duende.IdentityServer.Stores;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityServerAspNetIdentity.Pages.MobileLogin
{
    // !research annotaion
    [SecurityHeaders]
    [AllowAnonymous]
    public class IndexModel : PageModel
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IIdentityServerInteractionService _interaction;
        private readonly IEventService _events;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IIdentityProviderStore _identityProviderStore;

        public IndexModel(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IIdentityServerInteractionService interaction,
        IEventService events,
        IAuthenticationSchemeProvider schemeProvider,
        IIdentityProviderStore identityProviderStore
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _interaction = interaction;
            _events = events;
            _schemeProvider = schemeProvider;
            _identityProviderStore = identityProviderStore;
        }
        public async Task<IActionResult> OnGet()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                return Redirect("~/");
            }

            return Page();
        }
    }
}
