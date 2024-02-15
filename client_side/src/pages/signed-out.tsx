import { signOut } from "next-auth/react";
import { ReactNode } from "react";

function SignedOut(): ReactNode {
  // signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
  console.log(process.env.NEXTAUTH_URL);
  return <div></div>;
}

export default SignedOut;
