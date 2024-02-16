import { DefaultMenu } from "@/constants";
import { Context } from "@/context/contextProvider";
import { Session } from "@/types/next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

interface Params {}

function Header({}: Params): React.ReactNode {
  const router = useRouter();
  const { data: session } = useSession();
  const { setCurrentMenu } = useContext(Context);

  const customSession = session as Session;
  const id_token = customSession?.id_token ?? null;

  const singedOutBtnHandler = async () => {
    try {
      const res = await fetch("/api/auth/faderated-logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token }),
      });

      if (res.ok) {
        const { logoutUrl } = await res.json();

        if (logoutUrl) {
          window.location.href = logoutUrl;
        }

        // router.push("/");

        // signOut({ redirect: false, callbackUrl: "/" });
        signOut({ redirect: false });
      } else {
        console.log("Logout Error");
      }
    } catch (error) {
      console.log("[Error] logout", error);
    }
  };

  //! useEffect
  useEffect(() => {
    const menu = DefaultMenu.list.find((m) => m.path === router.pathname);
    if (!menu) router.push("/");
    else setCurrentMenu(menu);
  }, [router]);

  return (
    <div className="min-h-[70px] flex items-center px-4 border-b-2 w-full justify-between">
      <ul className="flex gap-4">
        {DefaultMenu &&
          DefaultMenu.list &&
          DefaultMenu.list.map((menu, idx) => (
            <li key={idx}>
              <Link
                className={`${
                  menu.path === router.pathname ? "text-blue-600" : "text-black"
                }`}
                href={menu.path}
              >
                {menu.name}
              </Link>
            </li>
          ))}
      </ul>
      <div>
        {session ? (
          <button
            className="btn bg-blue-500 text-white text-sm font-semibold"
            onClick={singedOutBtnHandler}
          >
            Sign out
          </button>
        ) : (
          <button
            className="btn bg-blue-500 text-white text-sm font-semibold"
            onClick={() => signIn("cloudHospital")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
