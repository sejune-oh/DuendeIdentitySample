import { CLIENT_ID, DefaultMenu, SCOPE } from "@/constants";
import { Context } from "@/context/contextProvider";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

interface Params {}

function Header({}: Params): React.ReactNode {
  const router = useRouter();
  const { data: session } = useSession();
  const { setCurrentMenu } = useContext(Context);

  const onClickBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signIn();
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
      {!session && (
        <div>
          <button
            className="btn bg-blue-500 text-white text-sm font-semibold"
            onClick={onClickBtnHandler}
          >
            {!session ? "Sign-In" : "Sign-Out"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
