import { CLIENT_SECRET } from "@/constants";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const issuer = process.env.IDENTITY_ISSUER;

export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    DuendeIDS6Provider({
      id: "cloudHospital",
      name: "CloudHospital",
      authorization: {
        params: {
          scope: process.env.IDENTITY_SCOPE,
          redirect_uri: process.env.IDENTITY_REDIRECTURL,
        },
      },
      wellKnown: `${issuer}/.well-known/openid-configuration`,
      userinfo: {
        url: `${issuer}/connect/userinfo`,
      },
      profileUrl: `${issuer}/connect/userinfo`,
      async profile(profile, tokens) {
        return {
          id: profile.sub,
          role: profile.role,
          preferred_username: profile.preferred_username,
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
        };
      },
      token: {
        async request({ client, provider, params, checks }) {
          const tokens = await client.callback(
            provider.callbackUrl,
            params,
            checks
          );
          console.log("🚀 ~ request ~ tokens:", tokens);
          return { tokens };
        },
      },
      idToken: false,
      issuer: issuer,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  secret: process.env.CLIENT_SECRET!,
  theme: {
    colorScheme: "light",
  },
  pages: {
    // signIn: "/auth/signIn", // Displays signin buttons
    // signOut: "/auth/signout", // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // error: "/auth/signIn",
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      console.log("🚀 ~ signIn ~ user:", user);
      return user ? true : false;
    },
    async jwt({ token, account }) {
      console.log("🚀 ~ jwt ~ token:", token);
      console.log("Next Auth callback token");
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("🚀 ~ session ~ token:", token);
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("url: ", url);
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  events: {
    async signOut(message: { session: Session; token: JWT }) {
      console.log("signOut: ", message);
    },
  },
});
// export const authOptions: AuthOptions = {
//   providers: [
//     DuendeIDS6Provider({
//       authorization: {
//         params: {
//           scope: process.env.IDENTITY_SCOPE,
//           redirect_uri: process.env.IDENTITY_REDIRECTURL,
//         },
//       },
//       clientId: process.env.CLIENT_ID!,
//       clientSecret: process.env.CLIENT_SECRET!,
//       issuer: process.env.IDENTITY_ISSUER,
//       userinfo: {
//         url: `${issuer}/connect/userinfo`,
//       },
//       profileUrl: `${issuer}/connect/userinfo`,
//       async profile(profile, token) {
//         console.log("🚀 ~ profile ~ profile:", profile);
//         return {
//           id: profile.sub,
//           role: profile.role,
//           preferred_username: profile.preferred_username,
//           name: profile.name,
//           email: profile.email,
//           email_verified: profile.email_verified,
//         };
//       },
//       token: {
//         async request({ client, provider, params, checks }) {
//           console.log("🚀 ~ request ~ client:", client);
//           const tokens = await client.callback(
//             provider.callbackUrl,
//             params,
//             checks
//           );
//           return { tokens };
//         },
//       },
//     }),
//   ],
//   secret: process.env.CLIENT_SECRET,
//   callbacks: {
//     async signIn({ user }) {
//       console.log("🚀 ~ signIn ~ user:", user);
//       return user ? true : false;
//     },
//     async jwt({ token, account }) {
//       console.log("🚀 ~ jwt ~ token:", token);
//       console.log("Next Auth callback token");
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       console.log("🚀 ~ session ~ token:", token);
//       return session;
//     },

//     async redirect({ url, baseUrl }) {
//       if (url.startsWith(baseUrl)) return url;
//       else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
//       return baseUrl;
//     },
//   },
// };

//export default NextAuth(authOptions);
