import { IDENTIY_ISSUER } from "@/constants";
import NextAuth, { AuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

const auth_url = IDENTIY_ISSUER;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const authOptions: AuthOptions = {
  providers: [
    DuendeIDS6Provider({
      authorization: {
        params: {
          scope: "openid profile mobile verification",
          //redirect_uri: "http://localhost:3000/signin-oidc",
          redirect_uri: "http://localhost:3000",
        },
      },
      clientId: "webClient",
      clientSecret: "clientSecret",
      issuer: "https://localhost:5001",
    }),
  ],
};

export default NextAuth(authOptions);
