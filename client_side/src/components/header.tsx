import { CLIENT_ID, DefaultMenu, SCOPE } from "@/constants";
import { Context } from "@/context/contextProvider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

interface Params {}

// const client_id = CLIENT_ID;
// const scope = SCOPE;

const client_id = "webClient";
const scope = "openid profile api mobile offline";
const return_url = "http://localhost:3000";

function Header({}: Params): React.ReactNode {
  const router = useRouter();
  const { data: session } = useSession();
  const { setCurrentMenu } = useContext(Context);

  //#region Temporary data
  const url = `https://localhost:5001/account/login?client_id=${client_id}&scope=${scope}&return_uri=${return_url}`;
  //#endregion Temporary data

  //! function

  const onClickBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    //window
    // window.open(
    //   url,
    //   "IdentityLogin",
    //   "width=500, height=600  scrollbar=yes resizable=no top=400 left=500"
    // );

    router.push(url);
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
