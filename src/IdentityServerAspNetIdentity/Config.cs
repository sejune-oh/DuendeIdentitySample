using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;

namespace IdentityServerAspNetIdentity;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource("color", new [] {"favorite_color"}),
            new IdentityResource("mobile", new [] {"mobile_number"}),
            new IdentityResource()
            {
                Name = "verification",
                UserClaims = new List<string>
                {
                    JwtClaimTypes.Email,
                    JwtClaimTypes.EmailVerified
                }
            }
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope(name: "api", displayName: "My API")
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
            {
                ClientId = "client",

                // no interactive user, use the clientid/secret for authentication
                AllowedGrantTypes = GrantTypes.ClientCredentials,

                // secret for authentication
                ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },

                // scopes that client has access to
                AllowedScopes = { "api" }
            },
            // interactive ASP.NET Core Web App
            new Client
            {
                ClientId = "web",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                
                // where to redirect to after login
                RedirectUris = { "https://localhost:5002/signin-oidc" },

                // where to redirect to after logout
                PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

                AllowOfflineAccess = true,

                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "verification",
                    "api",
                    "color",
                    "mobile"
                }
            },
            new Client
            {
                ClientId = "bff",
                 ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = { "https://localhost:5003/signin-oidc" },
                PostLogoutRedirectUris = { "https://localhost:5003/signout-callback-oidc" },
                AllowedScopes = new List<string>{
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "api"
                }
            }, 
            new Client
            {
                ClientId = "webClient",
                ClientSecrets = {new Secret("clientSecret".Sha256())},
                AllowedGrantTypes = new [] { GrantType.AuthorizationCode, GrantType.ResourceOwnerPassword },
                RedirectUris = {"http://localhost:3000/api/auth/callback/cloudHospital"},
                RequireConsent= false,
                PostLogoutRedirectUris = {"http://localhost:3000/signed_out"},
                AllowOfflineAccess = true,
                AllowAccessTokensViaBrowser= true,
                EnableLocalLogin= true,
                AllowedCorsOrigins = new []{"http://localhost:3000"},
                AllowedScopes = {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "api",
                    "mobile"
                }

            }
        };
}

