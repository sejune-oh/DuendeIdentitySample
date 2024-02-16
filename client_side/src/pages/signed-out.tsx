import { signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

function SignedOut(): ReactNode {
  // signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Signed out page");
    console.log("Signed out session", session);
    if (session) {
      signOut({ redirect: false, callbackUrl: "/" });
    } else {
      window.location.href = "/";
    }
  }, [session]);

  console.log(process.env.NEXTAUTH_URL);
  return <div></div>;
}

export default SignedOut;
