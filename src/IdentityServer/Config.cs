using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;
using static System.Net.WebRequestMethods;

namespace IdentityServer;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        { 
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource()
            {
                Name =  "verification",
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
               new ApiScope(name: "api", displayName: "API")
            }; 

    public static IEnumerable<Client> Clients =>
        new Client[] 
            { 
                new Client
                {
                   ClientId = "client",
                   // no interative user
                   AllowedGrantTypes = GrantTypes.ClientCredentials,
                   ClientSecrets = {new Secret("secret".Sha256())},
                   AllowedScopes ={"api"}
                },
                new Client 
                {
                    ClientId = "web",
                    ClientSecrets = {new Secret("secret".Sha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = {"https://localhost:5002/signin-oidc"},
                    PostLogoutRedirectUris = {"https://localhost:5002/signout-callback-oidc"},
                    AllowedScopes = {IdentityServerConstants.StandardScopes.OpenId, IdentityServerConstants.StandardScopes.Profile, "verification", "api" }
                }  
            };
}