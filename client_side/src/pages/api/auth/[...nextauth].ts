import { IDENTIY_ISSUER } from "@/constants";
import auths from "@/services/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth_url = IDENTIY_ISSUER;

export function nextAuthOption(request: NextApiRequest): NextAuthOptions {
  console.log("CALL nextAuthOption");
  return {
    providers: [
      CredentialsProvider({
        id: "SignWithROPC",
        name: "SignWithROPC",
        credentials: {
          username: {
            label: "Email",
            type: "text",
            placeholder: "name@email.com",
          },
          password: { label: "Password", type: "password" },
        },
        authorize: async function (
          credentials: Record<"username" | "password", string> | undefined
        ) {
          console.log("🚀 ~ nextAuthOption ~ credentials:", credentials);
          // req로 받은 데이터에서값 가져오기
          if (credentials) {
            const userSignIn: { email: string; password: string } = {
              email: credentials.username,
              password: credentials.password,
            };

            try {
              const identityToken = await auths.signInROPC(userSignIn);
              console.log(
                "🚀 ~ nextAuthOption ~ identityToken:",
                identityToken
              );

              return null;
            } catch (error: any) {
              throw new error();
            }
          }
          throw new Error("Function not implemented.");
        },
      }),
    ],
  };
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "SignWithROPC",
      name: "SignWithROPC",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "name@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (
        credentials: Record<"username" | "password", string> | undefined
      ) {
        // req로 받은 데이터에서값 가져오기
        if (credentials) {
          const userSignIn: { email: string; password: string } = {
            email: credentials.username,
            password: credentials.password,
          };

          try {
            const identityToken = await auths.signInROPC(userSignIn);
            console.log("🚀 ~ nextAuthOption ~ identityToken:", identityToken);

            return null;
          } catch (error: any) {
            throw new error();
          }
        }
        throw new Error("Function not implemented.");
      },
    }),
  ],
};

export default NextAuth(options);
