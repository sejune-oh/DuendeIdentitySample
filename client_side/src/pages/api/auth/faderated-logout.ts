import { json } from "stream/consumers";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const secret = process.env.NEXTAUTH_SECRET;

export default async function federatedLogout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const { id_token } = body;

    if (!id_token) {
      console.warn(
        "No JWT token found when calling /federated-logout endpoint"
      );
      return res.redirect(process.env.NEXTAUTH_URL!);
    }

    if (id_token) {
      console.log("clear 2");
      const endsessionURL = `${process.env.IDENTITY_ISSUER}/connect/endsession`;
      const endsessionParams = new URLSearchParams("");

      endsessionParams.set("id_token_hint", id_token as string);
      endsessionParams.set(
        "post_logout_redirect_uri",
        `${process.env.NEXTAUTH_URL}/signed-out`
      );

      res.setHeader(
        "Set-Cookie",
        "next-auth.session-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      );

      res.setHeader("Content-Type", "application/x-www-form-urlencoded");

      return res.redirect(`${endsessionURL}?${endsessionParams}`);
      // return res.json({ logoutUrl: `${endsessionURL}?${endsessionParams}` });
    } else {
      console.warn(
        "Without an id_token the user won't be redirected back from the IdP after logout."
      );
    }

    return res.json({ hello: "test" });
  } catch (error) {
    console.error(error);
    res.redirect(process.env.NEXTAUTH_URL!);
  }
}
